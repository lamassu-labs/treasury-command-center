# Production Deployment Guide

Comprehensive guide for deploying Treasury Command Center in production environments.

## 🏗️ Production Architecture

### Recommended Infrastructure
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   Web Servers   │    │   Database      │
│   (nginx/HAProxy│ -> │   (Frontend)    │ -> │   (PostgreSQL)  │
│   + SSL/TLS)    │    │   Multiple pods │    │   with replicas │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                │
                       ┌─────────────────┐    ┌─────────────────┐
                       │   API Servers   │    │   Cache Layer   │
                       │   (Backend)     │ -> │   (Redis)       │
                       │   Multiple pods │    │   with clusters │
                       └─────────────────┘    └─────────────────┘
```

### Minimum Production Requirements
- **CPU**: 4 cores (8 recommended)
- **RAM**: 8GB (16GB recommended)
- **Storage**: 100GB SSD (500GB+ for large deployments)
- **Network**: Stable internet with low latency to blockchain nodes
- **OS**: Ubuntu 22.04 LTS, CentOS 8+, or Docker-compatible environment

## 🚀 Deployment Options

### Option 1: Docker Deployment (Recommended)

#### 1. Prepare Production Environment
```bash
# Clone repository
git clone https://github.com/lamassu-labs/treasury-command-center.git
cd treasury-command-center

# Switch to stable release
git checkout v1.0.0  # Use latest stable tag
```

#### 2. Production Configuration
```bash
# Copy production environment template
cp env.template .env.production

# Edit production configuration
nano .env.production
```

#### 3. Production Environment Variables
```bash
# Production settings
NODE_ENV=production
DEBUG=false

# Database (use managed PostgreSQL service)
DATABASE_URL=postgresql://user:password@db-host:5432/treasury_prod
REDIS_URL=redis://redis-host:6379

# Security (generate strong secrets)
NEXTAUTH_SECRET=your-super-secure-nextauth-secret-64-chars-minimum
JWT_SECRET=your-jwt-secret-key-change-in-production-environment
API_KEY_SECRET=your-api-key-signing-secret-for-production-use

# Domain configuration
NEXTAUTH_URL=https://your-domain.com
CORS_ORIGIN=https://your-domain.com

# SSL/TLS
SSL_ENABLED=true
SSL_CERT_PATH=/etc/ssl/certs/treasury-cc.crt
SSL_KEY_PATH=/etc/ssl/private/treasury-cc.key

# Production blockchain endpoints
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-production-key
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/your-production-key

# Monitoring
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
PROMETHEUS_ENABLED=true

# Notification services
SENDGRID_API_KEY=your-production-sendgrid-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/your-webhook
```

#### 4. Deploy with Docker Compose
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Check service status
docker-compose -f docker-compose.prod.yml ps
```

### Option 2: Kubernetes Deployment

#### 1. Prepare Kubernetes Manifests
```bash
# Create namespace
kubectl create namespace treasury-cc

# Apply configurations
kubectl apply -f k8s/ -n treasury-cc
```

#### 2. Example Kubernetes Configuration
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: treasury-cc-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: treasury-cc-backend
  template:
    metadata:
      labels:
        app: treasury-cc-backend
    spec:
      containers:
      - name: backend
        image: treasury-cc/backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: treasury-cc-secrets
              key: database-url
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
```

### Option 3: Manual Deployment

#### 1. System Dependencies
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y python3.11 python3.11-venv python3-pip nodejs npm postgresql-client redis-tools nginx

# CentOS/RHEL
sudo dnf install -y python3.11 python3-pip nodejs npm postgresql redis nginx
```

#### 2. Application Setup
```bash
# Create application user
sudo useradd -m -s /bin/bash treasury-cc
sudo su - treasury-cc

# Setup application
git clone https://github.com/lamassu-labs/treasury-command-center.git
cd treasury-command-center

# Backend setup
cd src/backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r ../../requirements.txt

# Frontend setup
cd ../frontend
npm ci --only=production
npm run build
```

#### 3. System Services
```bash
# Create systemd service for backend
sudo tee /etc/systemd/system/treasury-cc-backend.service > /dev/null <<EOF
[Unit]
Description=Treasury Command Center Backend
After=network.target postgresql.service redis.service

[Service]
Type=simple
User=treasury-cc
WorkingDirectory=/home/treasury-cc/treasury-command-center/src/backend
Environment=PATH=/home/treasury-cc/treasury-command-center/src/backend/venv/bin
ExecStart=/home/treasury-cc/treasury-command-center/src/backend/venv/bin/python main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
sudo systemctl enable treasury-cc-backend
sudo systemctl start treasury-cc-backend
```

## 🔒 Security Configuration

### SSL/TLS Setup
```bash
# Using Let's Encrypt with Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Nginx Configuration
```nginx
# /etc/nginx/sites-available/treasury-cc
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

    # Frontend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

### Firewall Configuration
```bash
# UFW (Ubuntu)
sudo ufw enable
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw deny 8000/tcp  # Block direct backend access
sudo ufw deny 3000/tcp  # Block direct frontend access

# Allow database access only from application servers
sudo ufw allow from 10.0.0.0/24 to any port 5432
```

## 📊 Monitoring & Observability

### Application Monitoring
```bash
# Prometheus configuration
# /etc/prometheus/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'treasury-cc-backend'
    static_configs:
      - targets: ['localhost:8000']
    metrics_path: '/metrics'

  - job_name: 'treasury-cc-frontend'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/api/metrics'
```

### Log Management
```bash
# Centralized logging with rsyslog
sudo tee /etc/rsyslog.d/50-treasury-cc.conf > /dev/null <<EOF
# Treasury Command Center logs
:programname, isequal, "treasury-cc-backend" /var/log/treasury-cc/backend.log
:programname, isequal, "treasury-cc-frontend" /var/log/treasury-cc/frontend.log
& stop
EOF

sudo systemctl restart rsyslog
```

### Health Checks
```bash
# Create health check script
sudo tee /usr/local/bin/treasury-cc-health.sh > /dev/null <<EOF
#!/bin/bash
# Check backend health
curl -f http://localhost:8000/health || exit 1

# Check frontend health
curl -f http://localhost:3000/api/health || exit 1

# Check database connectivity
pg_isready -h localhost -p 5432 -U treasury_user || exit 1

# Check Redis connectivity
redis-cli ping || exit 1

echo "All services healthy"
EOF

chmod +x /usr/local/bin/treasury-cc-health.sh

# Add to cron for regular checks
echo "*/5 * * * * /usr/local/bin/treasury-cc-health.sh >> /var/log/treasury-cc-health.log 2>&1" | sudo crontab -
```

## 🔄 Database Management

### Production Database Setup
```sql
-- Create production database
CREATE DATABASE treasury_command_center_prod;

-- Create application user with limited privileges
CREATE USER treasury_app WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE treasury_command_center_prod TO treasury_app;
GRANT USAGE ON SCHEMA public TO treasury_app;
GRANT CREATE ON SCHEMA public TO treasury_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO treasury_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO treasury_app;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO treasury_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO treasury_app;
```

### Backup Strategy
```bash
# Daily automated backups
sudo tee /usr/local/bin/treasury-cc-backup.sh > /dev/null <<EOF
#!/bin/bash
BACKUP_DIR="/backups/treasury-cc"
DATE=$(date +%Y%m%d_%H%M%S)

# Database backup
pg_dump -h localhost -U treasury_app treasury_command_center_prod | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Application data backup
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz /home/treasury-cc/treasury-command-center

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/treasury-cc-backup.sh

# Schedule daily backups
echo "0 2 * * * /usr/local/bin/treasury-cc-backup.sh >> /var/log/treasury-cc-backup.log 2>&1" | sudo crontab -
```

## 🔧 Maintenance & Updates

### Update Process
```bash
# 1. Backup current deployment
./scripts/backup-production.sh

# 2. Download new version
git fetch origin
git checkout v1.1.0  # New version tag

# 3. Update dependencies
cd src/backend && pip install -r ../../requirements.txt
cd ../frontend && npm ci

# 4. Run database migrations
python manage.py migrate

# 5. Build frontend
npm run build

# 6. Restart services
sudo systemctl restart treasury-cc-backend
sudo systemctl restart nginx

# 7. Verify deployment
curl https://your-domain.com/api/health
```

### Rollback Procedure
```bash
# 1. Stop services
sudo systemctl stop treasury-cc-backend

# 2. Restore previous version
git checkout v1.0.0  # Previous stable version

# 3. Restore database (if needed)
gunzip -c /backups/treasury-cc/db_backup_YYYYMMDD_HHMMSS.sql.gz | psql -h localhost -U treasury_app treasury_command_center_prod

# 4. Restart services
sudo systemctl start treasury-cc-backend
```

## 📈 Performance Optimization

### Database Optimization
```sql
-- Add indexes for common queries
CREATE INDEX CONCURRENTLY idx_wallets_user_id ON wallets(user_id);
CREATE INDEX CONCURRENTLY idx_transactions_wallet_id ON transactions(wallet_id);
CREATE INDEX CONCURRENTLY idx_balances_wallet_id_timestamp ON balances(wallet_id, timestamp);

-- Update table statistics
ANALYZE;
```

### Application Optimization
```bash
# Enable Redis caching
redis-cli CONFIG SET maxmemory 2gb
redis-cli CONFIG SET maxmemory-policy allkeys-lru

# Configure PostgreSQL connection pooling
# Add to postgresql.conf:
# max_connections = 200
# shared_preload_libraries = 'pg_stat_statements'
```

## 🆘 Troubleshooting

### Common Production Issues

#### High Memory Usage
```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head

# Restart services if needed
sudo systemctl restart treasury-cc-backend
```

#### Database Connection Issues
```bash
# Check PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log

# Check connection pool
sudo -u postgres psql -c "SELECT * FROM pg_stat_activity;"
```

#### SSL Certificate Issues
```bash
# Check certificate expiry
openssl x509 -in /etc/letsencrypt/live/your-domain.com/cert.pem -text -noout | grep "Not After"

# Renew certificate
sudo certbot renew --dry-run
```

## 📞 Production Support

- **Emergency Contact**: production-support@treasury-command-center.com
- **Status Page**: https://status.treasury-command-center.com
- **Documentation**: https://docs.treasury-command-center.com
- **Community**: [Discord #production-support](https://discord.gg/treasury-command-center)

---

**Last Updated**: July 17, 2025  
**Version**: 1.0.0
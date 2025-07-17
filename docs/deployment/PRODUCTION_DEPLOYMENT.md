# Production Deployment Guide

Comprehensive guide for deploying Treasury Command Center in production environments.

## 🏗️ Production Architecture

### Production Infrastructure Architecture

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#7C3AED',
    'primaryTextColor': '#FFFFFF',
    'primaryBorderColor': '#5B21B6',
    'lineColor': '#6B7280',
    'sectionColor': '#F3F0FF',
    'textColor': '#374151'
  }
}}%%
graph TB
    subgraph "Internet & CDN"
        Users[Users]
        CDN[Content Delivery Network<br/>Static Assets & Caching]
        DNS[DNS & Domain<br/>Route 53 / Cloudflare]
    end
    
    subgraph "Load Balancing & SSL"
        LB[Load Balancer<br/>nginx/HAProxy + SSL/TLS]
        WAF[Web Application Firewall<br/>DDoS Protection]
        SSL[SSL Termination<br/>Let's Encrypt / Custom Certs]
    end
    
    subgraph "Application Layer - Frontend"
        FE1[Frontend Server 1<br/>Next.js Application]
        FE2[Frontend Server 2<br/>Next.js Application]
        FE3[Frontend Server 3<br/>Next.js Application]
    end
    
    subgraph "Application Layer - Backend"
        BE1[Backend Server 1<br/>FastAPI + Services]
        BE2[Backend Server 2<br/>FastAPI + Services]
        BE3[Backend Server 3<br/>FastAPI + Services]
    end
    
    subgraph "Data Layer - Primary"
        PG_PRIMARY[(PostgreSQL Primary<br/>Read/Write Operations)]
        PG_REPLICA1[(PostgreSQL Replica 1<br/>Read Operations)]
        PG_REPLICA2[(PostgreSQL Replica 2<br/>Read Operations)]
    end
    
    subgraph "Data Layer - Cache & Storage"
        REDIS_CLUSTER[(Redis Cluster<br/>Session & Cache)]
        REDIS_SENTINEL[(Redis Sentinel<br/>High Availability)]
        FILE_STORAGE[(File Storage<br/>Reports & Backups<br/>S3/MinIO)]
    end
    
    subgraph "Monitoring & Observability"
        PROMETHEUS[Prometheus<br/>Metrics Collection]
        GRAFANA[Grafana<br/>Monitoring Dashboards]
        LOKI[Loki<br/>Log Aggregation]
        JAEGER[Jaeger<br/>Distributed Tracing]
    end
    
    subgraph "External Services"
        BLOCKCHAIN[Blockchain Nodes<br/>Ethereum, Polygon, etc.]
        PRICE_APIS[Price Data APIs<br/>CoinGecko, Chainlink]
        EMAIL_SVC[Email Service<br/>SendGrid/SES]
        BACKUP_STORAGE[(Backup Storage<br/>S3 Glacier/Cold Storage)]
    end
    
    %% User flow
    Users --> DNS
    DNS --> CDN
    CDN --> WAF
    WAF --> SSL
    SSL --> LB
    
    %% Load balancer distribution
    LB --> FE1
    LB --> FE2
    LB --> FE3
    
    LB --> BE1
    LB --> BE2
    LB --> BE3
    
    %% Backend to data layer
    BE1 --> PG_PRIMARY
    BE2 --> PG_PRIMARY
    BE3 --> PG_PRIMARY
    
    BE1 --> PG_REPLICA1
    BE2 --> PG_REPLICA2
    BE3 --> PG_REPLICA1
    
    BE1 --> REDIS_CLUSTER
    BE2 --> REDIS_CLUSTER
    BE3 --> REDIS_CLUSTER
    
    %% Database replication
    PG_PRIMARY -.-> PG_REPLICA1
    PG_PRIMARY -.-> PG_REPLICA2
    
    %% Redis high availability
    REDIS_CLUSTER -.-> REDIS_SENTINEL
    
    %% File storage
    BE1 --> FILE_STORAGE
    BE2 --> FILE_STORAGE
    BE3 --> FILE_STORAGE
    
    %% External connections
    BE1 --> BLOCKCHAIN
    BE2 --> PRICE_APIS
    BE3 --> EMAIL_SVC
    
    %% Backup strategy
    PG_PRIMARY --> BACKUP_STORAGE
    FILE_STORAGE --> BACKUP_STORAGE
    
    %% Monitoring connections
    BE1 --> PROMETHEUS
    BE2 --> PROMETHEUS
    BE3 --> PROMETHEUS
    FE1 --> PROMETHEUS
    FE2 --> PROMETHEUS
    FE3 --> PROMETHEUS
    
    PROMETHEUS --> GRAFANA
    BE1 --> LOKI
    BE2 --> LOKI
    BE3 --> LOKI
    
    %% Styling
    classDef internet fill:#6B7280,color:#FFFFFF,stroke:#4B5563,stroke-width:2px
    classDef security fill:#DC2626,color:#FFFFFF,stroke:#B91C1C,stroke-width:2px
    classDef frontend fill:#F3F0FF,stroke:#7C3AED,stroke-width:2px
    classDef backend fill:#7C3AED,color:#FFFFFF,stroke:#5B21B6,stroke-width:2px
    classDef database fill:#1E40AF,color:#FFFFFF,stroke:#1E3A8A,stroke-width:2px
    classDef cache fill:#059669,color:#FFFFFF,stroke:#047857,stroke-width:2px
    classDef monitoring fill:#D97706,color:#FFFFFF,stroke:#B45309,stroke-width:2px
    classDef external fill:#6B7280,color:#FFFFFF,stroke:#4B5563,stroke-width:2px
    
    class Users,CDN,DNS internet
    class LB,WAF,SSL security
    class FE1,FE2,FE3 frontend
    class BE1,BE2,BE3 backend
    class PG_PRIMARY,PG_REPLICA1,PG_REPLICA2 database
    class REDIS_CLUSTER,REDIS_SENTINEL,FILE_STORAGE cache
    class PROMETHEUS,GRAFANA,LOKI,JAEGER monitoring
    class BLOCKCHAIN,PRICE_APIS,EMAIL_SVC,BACKUP_STORAGE external
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

## 🔄 CI/CD Deployment Pipeline

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#7C3AED',
    'primaryTextColor': '#FFFFFF',
    'primaryBorderColor': '#5B21B6',
    'lineColor': '#6B7280',
    'sectionColor': '#F3F0FF',
    'textColor': '#374151'
  }
}}%%
flowchart TD
    subgraph "Development"
        DEV[Developer Commits]
        PR[Pull Request Created]
        REVIEW[Code Review]
    end
    
    subgraph "CI Pipeline"
        TRIGGER[GitHub Actions Trigger]
        BUILD[Build & Test]
        LINT[Code Quality Checks]
        SECURITY[Security Scanning]
        PACKAGE[Build Docker Images]
    end
    
    subgraph "Quality Gates"
        UNIT_TESTS[Unit Tests<br/>95%+ Coverage]
        INTEGRATION[Integration Tests<br/>API & Database]
        E2E[End-to-End Tests<br/>UI Workflows]
        PERFORMANCE[Performance Tests<br/>Load & Stress]
    end
    
    subgraph "Staging Deployment"
        STAGING_BUILD[Deploy to Staging]
        STAGING_TESTS[Staging Validation]
        SMOKE_TESTS[Smoke Tests]
        UAT[User Acceptance Testing]
    end
    
    subgraph "Production Deployment"
        PROD_APPROVAL[Production Approval]
        BLUE_GREEN[Blue/Green Deployment]
        HEALTH_CHECK[Health Checks]
        MONITORING[Monitoring & Alerts]
    end
    
    subgraph "Post-Deployment"
        ROLLBACK{Rollback<br/>if Issues?}
        SUCCESS[Deployment Success]
        NOTIFICATION[Team Notifications]
        CLEANUP[Cleanup Old Images]
    end
    
    %% Development flow
    DEV --> PR
    PR --> REVIEW
    REVIEW --> TRIGGER
    
    %% CI Pipeline
    TRIGGER --> BUILD
    BUILD --> LINT
    LINT --> SECURITY
    SECURITY --> PACKAGE
    
    %% Quality gates
    PACKAGE --> UNIT_TESTS
    UNIT_TESTS --> INTEGRATION
    INTEGRATION --> E2E
    E2E --> PERFORMANCE
    
    %% Staging deployment
    PERFORMANCE --> STAGING_BUILD
    STAGING_BUILD --> STAGING_TESTS
    STAGING_TESTS --> SMOKE_TESTS
    SMOKE_TESTS --> UAT
    
    %% Production deployment
    UAT --> PROD_APPROVAL
    PROD_APPROVAL --> BLUE_GREEN
    BLUE_GREEN --> HEALTH_CHECK
    HEALTH_CHECK --> MONITORING
    
    %% Post-deployment
    MONITORING --> ROLLBACK
    ROLLBACK -->|Issues Found| BLUE_GREEN
    ROLLBACK -->|Success| SUCCESS
    SUCCESS --> NOTIFICATION
    NOTIFICATION --> CLEANUP
    
    %% Styling
    classDef development fill:#F3F0FF,stroke:#7C3AED,stroke-width:2px
    classDef ci fill:#7C3AED,color:#FFFFFF,stroke:#5B21B6,stroke-width:2px
    classDef quality fill:#1E40AF,color:#FFFFFF,stroke:#1E3A8A,stroke-width:2px
    classDef staging fill:#C65D3C,color:#FFFFFF,stroke:#B5472A,stroke-width:2px
    classDef production fill:#059669,color:#FFFFFF,stroke:#047857,stroke-width:2px
    classDef post fill:#D97706,color:#FFFFFF,stroke:#B45309,stroke-width:2px
    classDef decision fill:#DC2626,color:#FFFFFF,stroke:#B91C1C,stroke-width:2px
    
    class DEV,PR,REVIEW development
    class TRIGGER,BUILD,LINT,SECURITY,PACKAGE ci
    class UNIT_TESTS,INTEGRATION,E2E,PERFORMANCE quality
    class STAGING_BUILD,STAGING_TESTS,SMOKE_TESTS,UAT staging
    class PROD_APPROVAL,BLUE_GREEN,HEALTH_CHECK,MONITORING production
    class SUCCESS,NOTIFICATION,CLEANUP post
    class ROLLBACK decision
```

## ⚖️ Load Balancing & Traffic Management

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#7C3AED',
    'primaryTextColor': '#FFFFFF',
    'primaryBorderColor': '#5B21B6',
    'lineColor': '#6B7280',
    'sectionColor': '#F3F0FF',
    'textColor': '#374151'
  }
}}%%
graph TB
    subgraph "External Traffic"
        USERS[Users Worldwide]
        ATTACKS[DDoS Attacks]
        BOTS[Bot Traffic]
    end
    
    subgraph "Edge Protection"
        WAF[Web Application Firewall<br/>DDoS Protection<br/>Bot Detection]
        RATE_LIMIT[Rate Limiting<br/>1000 req/hour per IP]
        GEO_FILTER[Geographic Filtering<br/>Block/Allow Regions]
    end
    
    subgraph "Load Balancer Layer"
        LB_PRIMARY[Primary Load Balancer<br/>nginx/HAProxy<br/>Active]
        LB_SECONDARY[Secondary Load Balancer<br/>nginx/HAProxy<br/>Standby]
        HEALTH_CHECK[Health Check Service<br/>Monitor Backend Status]
    end
    
    subgraph "Frontend Cluster"
        FE_PRIMARY[Frontend Primary<br/>Next.js App<br/>Active]
        FE_SECONDARY[Frontend Secondary<br/>Next.js App<br/>Active]
        FE_TERTIARY[Frontend Tertiary<br/>Next.js App<br/>Standby]
    end
    
    subgraph "Backend Cluster"
        BE_PRIMARY[Backend Primary<br/>FastAPI<br/>Active]
        BE_SECONDARY[Backend Secondary<br/>FastAPI<br/>Active]
        BE_TERTIARY[Backend Tertiary<br/>FastAPI<br/>Standby]
    end
    
    subgraph "Database Cluster"
        DB_PRIMARY[(Database Primary<br/>Read/Write<br/>PostgreSQL)]
        DB_REPLICA1[(Database Replica 1<br/>Read Only<br/>PostgreSQL)]
        DB_REPLICA2[(Database Replica 2<br/>Read Only<br/>PostgreSQL)]
    end
    
    subgraph "Cache Cluster"
        REDIS_MASTER[(Redis Master<br/>Read/Write)]
        REDIS_SLAVE1[(Redis Slave 1<br/>Read Only)]
        REDIS_SLAVE2[(Redis Slave 2<br/>Read Only)]
    end
    
    %% Traffic flow
    USERS --> WAF
    ATTACKS --> WAF
    BOTS --> WAF
    
    WAF --> RATE_LIMIT
    RATE_LIMIT --> GEO_FILTER
    GEO_FILTER --> LB_PRIMARY
    
    %% Load balancer failover
    LB_PRIMARY -.->|Failover| LB_SECONDARY
    HEALTH_CHECK --> LB_PRIMARY
    HEALTH_CHECK --> LB_SECONDARY
    
    %% Frontend distribution
    LB_PRIMARY --> FE_PRIMARY
    LB_PRIMARY --> FE_SECONDARY
    LB_SECONDARY --> FE_TERTIARY
    
    %% Backend distribution
    LB_PRIMARY --> BE_PRIMARY
    LB_PRIMARY --> BE_SECONDARY
    LB_SECONDARY --> BE_TERTIARY
    
    %% Database connections
    BE_PRIMARY --> DB_PRIMARY
    BE_PRIMARY --> DB_REPLICA1
    BE_SECONDARY --> DB_PRIMARY
    BE_SECONDARY --> DB_REPLICA2
    BE_TERTIARY --> DB_REPLICA1
    
    %% Database replication
    DB_PRIMARY -.->|Replication| DB_REPLICA1
    DB_PRIMARY -.->|Replication| DB_REPLICA2
    
    %% Cache connections
    BE_PRIMARY --> REDIS_MASTER
    BE_SECONDARY --> REDIS_SLAVE1
    BE_TERTIARY --> REDIS_SLAVE2
    
    %% Cache replication
    REDIS_MASTER -.->|Replication| REDIS_SLAVE1
    REDIS_MASTER -.->|Replication| REDIS_SLAVE2
    
    %% Health monitoring
    HEALTH_CHECK -.-> FE_PRIMARY
    HEALTH_CHECK -.-> FE_SECONDARY
    HEALTH_CHECK -.-> FE_TERTIARY
    HEALTH_CHECK -.-> BE_PRIMARY
    HEALTH_CHECK -.-> BE_SECONDARY
    HEALTH_CHECK -.-> BE_TERTIARY
    
    %% Styling
    classDef traffic fill:#6B7280,color:#FFFFFF,stroke:#4B5563,stroke-width:2px
    classDef protection fill:#DC2626,color:#FFFFFF,stroke:#B91C1C,stroke-width:2px
    classDef balancer fill:#7C3AED,color:#FFFFFF,stroke:#5B21B6,stroke-width:2px
    classDef frontend fill:#F3F0FF,stroke:#7C3AED,stroke-width:2px
    classDef backend fill:#1E40AF,color:#FFFFFF,stroke:#1E3A8A,stroke-width:2px
    classDef database fill:#059669,color:#FFFFFF,stroke:#047857,stroke-width:2px
    classDef cache fill:#C65D3C,color:#FFFFFF,stroke:#B5472A,stroke-width:2px
    
    class USERS,ATTACKS,BOTS traffic
    class WAF,RATE_LIMIT,GEO_FILTER protection
    class LB_PRIMARY,LB_SECONDARY,HEALTH_CHECK balancer
    class FE_PRIMARY,FE_SECONDARY,FE_TERTIARY frontend
    class BE_PRIMARY,BE_SECONDARY,BE_TERTIARY backend
    class DB_PRIMARY,DB_REPLICA1,DB_REPLICA2 database
    class REDIS_MASTER,REDIS_SLAVE1,REDIS_SLAVE2 cache
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

### Comprehensive Monitoring Stack

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#7C3AED',
    'primaryTextColor': '#FFFFFF',
    'primaryBorderColor': '#5B21B6',
    'lineColor': '#6B7280',
    'sectionColor': '#F3F0FF',
    'textColor': '#374151'
  }
}}%%
graph TB
    subgraph "Application Layer"
        FE_APP[Frontend Applications<br/>Next.js + React]
        BE_APP[Backend Services<br/>FastAPI + Python]
        DB_APP[(Database Services<br/>PostgreSQL + Redis)]
        EXT_APP[External Services<br/>Blockchain + APIs]
    end
    
    subgraph "Metrics Collection"
        PROM[Prometheus Server<br/>Metrics Storage & Queries]
        NODE_EXP[Node Exporter<br/>System Metrics]
        CADVISOR[cAdvisor<br/>Container Metrics]
        APP_METRICS[Application Metrics<br/>Custom Business Logic]
    end
    
    subgraph "Log Aggregation"
        LOKI[Loki<br/>Log Storage & Queries]
        PROMTAIL[Promtail<br/>Log Collection Agent]
        FLUENTD[Fluentd<br/>Log Processing & Routing]
        LOG_STORAGE[(Log Storage<br/>S3 Compatible)]
    end
    
    subgraph "Distributed Tracing"
        JAEGER[Jaeger<br/>Trace Collection & Analysis]
        OTEL[OpenTelemetry<br/>Instrumentation]
        TRACE_STORAGE[(Trace Storage<br/>Elasticsearch)]
    end
    
    subgraph "Visualization & Alerting"
        GRAFANA[Grafana<br/>Dashboards & Visualization]
        ALERT_MANAGER[Alert Manager<br/>Alert Routing & Grouping]
        NOTIFICATION[Notification Channels<br/>Email, Slack, PagerDuty]
    end
    
    subgraph "Synthetic Monitoring"
        UPTIME[Uptime Monitoring<br/>External Health Checks]
        PERF_TEST[Performance Testing<br/>Load & Stress Testing]
        SMOKE_TEST[Smoke Tests<br/>End-to-End Validation]
    end
    
    subgraph "Business Intelligence"
        BI_DASHBOARDS[Business Dashboards<br/>User Metrics & KPIs]
        ANALYTICS[Analytics Engine<br/>User Behavior Analysis]
        REPORTS[Automated Reports<br/>Daily/Weekly/Monthly]
    end
    
    %% Metrics flow
    FE_APP --> APP_METRICS
    BE_APP --> APP_METRICS
    DB_APP --> NODE_EXP
    EXT_APP --> APP_METRICS
    
    APP_METRICS --> PROM
    NODE_EXP --> PROM
    CADVISOR --> PROM
    
    %% Logging flow
    FE_APP --> PROMTAIL
    BE_APP --> PROMTAIL
    DB_APP --> FLUENTD
    
    PROMTAIL --> LOKI
    FLUENTD --> LOKI
    LOKI --> LOG_STORAGE
    
    %% Tracing flow
    FE_APP --> OTEL
    BE_APP --> OTEL
    OTEL --> JAEGER
    JAEGER --> TRACE_STORAGE
    
    %% Visualization
    PROM --> GRAFANA
    LOKI --> GRAFANA
    JAEGER --> GRAFANA
    
    %% Alerting
    PROM --> ALERT_MANAGER
    ALERT_MANAGER --> NOTIFICATION
    
    %% Synthetic monitoring
    UPTIME --> PROM
    PERF_TEST --> PROM
    SMOKE_TEST --> PROM
    
    %% Business intelligence
    PROM --> BI_DASHBOARDS
    LOKI --> ANALYTICS
    ANALYTICS --> REPORTS
    BI_DASHBOARDS --> REPORTS
    
    %% External monitoring
    UPTIME -.-> FE_APP
    UPTIME -.-> BE_APP
    PERF_TEST -.-> FE_APP
    SMOKE_TEST -.-> BE_APP
    
    %% Styling
    classDef application fill:#F3F0FF,stroke:#7C3AED,stroke-width:2px
    classDef metrics fill:#7C3AED,color:#FFFFFF,stroke:#5B21B6,stroke-width:2px
    classDef logging fill:#1E40AF,color:#FFFFFF,stroke:#1E3A8A,stroke-width:2px
    classDef tracing fill:#C65D3C,color:#FFFFFF,stroke:#B5472A,stroke-width:2px
    classDef visualization fill:#059669,color:#FFFFFF,stroke:#047857,stroke-width:2px
    classDef synthetic fill:#D97706,color:#FFFFFF,stroke:#B45309,stroke-width:2px
    classDef business fill:#6B7280,color:#FFFFFF,stroke:#4B5563,stroke-width:2px
    
    class FE_APP,BE_APP,DB_APP,EXT_APP application
    class PROM,NODE_EXP,CADVISOR,APP_METRICS metrics
    class LOKI,PROMTAIL,FLUENTD,LOG_STORAGE logging
    class JAEGER,OTEL,TRACE_STORAGE tracing
    class GRAFANA,ALERT_MANAGER,NOTIFICATION visualization
    class UPTIME,PERF_TEST,SMOKE_TEST synthetic
    class BI_DASHBOARDS,ANALYTICS,REPORTS business
```

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
---
id: quick-start
title: Quick Start Guide
sidebar_label: Quick Start
sidebar_position: 1
---
# Quick Start Guide

Get Treasury Command Center up and running in under 10 minutes with this quick start guide.

## 🚀 Prerequisites

Before you begin, ensure you have:
- **Node.js** v18+ and npm
- **Python** 3.9+ and pip
- **PostgreSQL** 13+
- **Redis** 6+
- **Git** for version control

## ⚡ Fast Setup (5 minutes)

### 1. Clone the Repository
```bash
git clone https://github.com/lamassu-labs/treasury-command-center.git
cd treasury-command-center
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.template .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

### 3. Install Dependencies
```bash
# Frontend dependencies
cd src/frontend
npm install

# Backend dependencies
cd ../backend
pip install -r ../../requirements.txt
pip install -r ../../requirements-dev.txt
```

### 4. Database Setup
```bash
# Start PostgreSQL and Redis (adjust for your system)
sudo systemctl start postgresql redis

# Create database
createdb treasury_command_center

# Run migrations (when available)
python -m alembic upgrade head
```

### 5. Start the Application
```bash
# Terminal 1: Start backend
cd src/backend
python main.py

# Terminal 2: Start frontend
cd src/frontend
npm run dev
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🔧 Quick Configuration

### Essential Environment Variables
```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/treasury_command_center
REDIS_URL=redis://localhost:6379

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret-here
JWT_SECRET=your-jwt-secret-here

# Basic blockchain access (for testing)
ETHEREUM_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/your-api-key
```

### Test the Setup
```bash
# Check backend health
curl http://localhost:8000/health

# Check frontend
curl http://localhost:3000
```

## 📊 First Steps

### 1. Create Your Account
1. Navigate to http://localhost:3000
2. Click "Register" and create your account
3. Verify your email (if configured)

### 2. Add Your First Wallet
1. Go to "Dashboard"
2. Click "Add Wallet"
3. Enter your wallet address
4. Select the blockchain network

### 3. View Your Treasury
- Monitor balances across chains
- Set up alerts for significant changes
- Configure automated reports

## 🔗 What's Next?

### Explore Core Features
- **Multi-chain Tracking**: Add wallets from different blockchains
- **Real-time Monitoring**: Set up alerts and notifications
- **Analytics Dashboard**: View comprehensive treasury analytics
- **API Access**: Generate API keys for programmatic access

### Advanced Setup
- **[Full Installation Guide](INSTALLATION.md)**: Detailed setup instructions
- **[Configuration Guide](CONFIGURATION.md)**: Advanced configuration options
- **[Integration Guide](../integration/)**: Connect external services
- **[API Documentation](../api/)**: Integrate with your systems

### Join the Community
- **Discord**: [Treasury Command Center Community](https://discord.gg/treasury-command-center)
- **GitHub**: [Issues and Discussions](https://github.com/lamassu-labs/treasury-command-center)
- **Documentation**: [Contribute to docs](../developers/CONTRIBUTING_DOCS.md)

## 🆘 Need Help?

### Common Issues
- **Port conflicts**: Change ports in .env file
- **Database connection**: Verify PostgreSQL is running and credentials
- **Permission errors**: Check file permissions and user access

### Getting Support
1. Check our [Troubleshooting Guide](TROUBLESHOOTING.md)
2. Search [existing issues](https://github.com/lamassu-labs/treasury-command-center/issues)
3. Join our [Discord community](https://discord.gg/treasury-command-center)
4. Create a [new issue](https://github.com/lamassu-labs/treasury-command-center/issues/new)

## ✅ Success Checklist

- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Database connected
- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Account created
- [ ] First wallet added
- [ ] Dashboard displaying data

**Congratulations!** You now have Treasury Command Center running locally. 

Next, explore our [detailed documentation](../README.md) to unlock the full potential of unified Web3 treasury management.
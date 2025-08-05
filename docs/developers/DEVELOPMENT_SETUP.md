---
id: development-setup
title: Development Setup
sidebar_label: Development Setup
sidebar_position: 1
---
# Development Setup Guide

**Complete development environment setup for Treasury Command Center**

## 🎯 **Development Environment Overview**

<div style="background-color: #f3f0ff; border-left: 4px solid #7C3AED; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

**🛠️ Comprehensive Setup**: This guide provides everything needed to set up a complete development environment for Treasury Command Center, including testing, debugging, and deployment tools.

<p style="margin-top: 1rem; font-size: 0.9em; color: #6B7280;"><em>Estimated setup time: 30 minutes for complete environment</em></p>

</div>

## 🔧 **Prerequisites**

### **Required Software**
```bash
# Node.js (LTS recommended)
Node.js 18.0.0 or higher
npm 9.0.0 or higher

# Python (for backend API services)
Python 3.11.0 or higher
pip 23.0.0 or higher

# Database Systems
PostgreSQL 15.0 or higher
Redis 7.0 or higher

# Version Control
Git 2.30.0 or higher
```

## 🚀 **Quick Setup (15 minutes)**

### **Step 1: Clone Repository**
```bash
# Clone the main repository
git clone https://github.com/treasury-command-center/treasury-command-center.git
cd treasury-command-center

# Set up remote for your fork (if contributing)
git remote add fork https://github.com/YOUR_USERNAME/treasury-command-center.git
```

### **Step 2: Install Dependencies**
```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Development dependencies

# Install pre-commit hooks
npm run prepare
```

### **Step 3: Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env  # or use your preferred editor
```

#### **Essential Environment Variables**
```bash
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/treasury_dev
REDIS_URL=redis://localhost:6379/0

# Application Configuration
NODE_ENV=development
API_PORT=8000
FRONTEND_PORT=3000
BACKEND_PORT=8001

# Authentication (development keys)
AUTH0_DOMAIN=dev-treasury-command-center.auth0.com
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
JWT_SECRET=your_jwt_secret_key_for_development
```

### **Step 4: Database Setup**
```bash
# Start PostgreSQL and Redis (using Docker)
docker-compose up -d postgres redis

# Run database migrations
npm run db:migrate

# Seed development data
npm run db:seed
```

### **Step 5: Start Development Servers**
```bash
# Start all services (recommended)
npm run dev

# Or start individually:
# Frontend (Terminal 1)
npm run dev:frontend

# Backend API (Terminal 2)
npm run dev:backend

# Python services (Terminal 3)
npm run dev:python
```

### **Step 6: Verify Setup**
1. **Frontend**: [http://localhost:3000](http://localhost:3000)
2. **Backend API**: [http://localhost:8000/health](http://localhost:8000/health)
3. **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
4. **Database**: Connect to `postgresql://postgres:password@localhost:5432/treasury_dev`

## 🔬 **Testing Framework Setup**

### **Frontend Testing**
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### **Backend Testing**
```bash
# Python testing setup
pip install pytest pytest-cov pytest-asyncio

# Run Python tests
npm run test:python

# Run API tests
npm run test:api

# Test coverage report
npm run test:coverage
```

## 🛠️ **Development Workflow**

### **Feature Development Process**

#### **1. Branch Strategy**
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Work on feature
git add .
git commit -m "feat: implement your feature"

# Push to your fork
git push fork feature/your-feature-name
```

#### **2. Testing Workflow**
```bash
# Run tests before committing
npm run test:all

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Test coverage
npm run test:coverage
```

#### **3. Code Review Preparation**
```bash
# Ensure code quality
npm run lint
npm run format
npm run type-check

# Build verification
npm run build
npm run build:check
```

## 🔐 **Security Setup**

### **Development Security**

#### **Environment Security**
```bash
# Never commit real API keys
echo ".env" >> .gitignore

# Use development API keys only
API_KEY=dev_test_key_not_for_production
```

#### **Local HTTPS Setup**
```bash
# Install mkcert for local SSL
brew install mkcert  # macOS
mkcert -install

# Generate local certificates
mkcert localhost 127.0.0.1 ::1

# Use HTTPS in development
HTTPS=true npm run dev
```

## 📚 **Documentation Development**

### **Documentation Tools**

#### **Storybook Setup**
```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# Add new stories
npm run storybook:add-story
```

#### **API Documentation**
```bash
# Generate OpenAPI docs
npm run docs:api

# Start documentation server
npm run docs:serve

# Update documentation
npm run docs:build
```

## 🎯 **Development Best Practices**

### **Code Quality Standards**
- Use TypeScript for type safety
- Include JSDoc comments for all functions
- Write component stories for UI components
- Update API documentation with changes
- Follow progressive disclosure principles

### **Testing Standards**
- Write unit tests for all utility functions
- Integration tests for API endpoints
- E2E tests for critical user flows
- Maintain >80% code coverage

## 🚀 **Deployment Setup**

### **Local Production Build**
```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Docker production build
docker build -t treasury-command-center .
docker run -p 3000:3000 treasury-command-center
```

## 🎉 **Development Environment Verification**

### **Complete Setup Checklist**
- [ ] Repository cloned and dependencies installed
- [ ] PostgreSQL and Redis running
- [ ] Environment variables configured
- [ ] Database migrated and seeded
- [ ] Frontend accessible at localhost:3000
- [ ] Backend API accessible at localhost:8000
- [ ] Tests passing
- [ ] Code quality tools working
- [ ] Documentation building
- [ ] Docker containers operational

### **Common Development Commands**
```bash
# Daily development
npm run dev              # Start all services
npm run test            # Run tests
npm run lint            # Check code quality
npm run db:migrate      # Update database schema

# Feature development
npm run test:watch      # Test-driven development
npm run type-check      # TypeScript validation
npm run build          # Production build test

# Debugging
npm run debug          # Debug mode
npm run logs           # View application logs
npm run db:studio      # Database GUI
```

## 📞 **Development Support**

### **Getting Help**
- **Discord**: #development channel for real-time help
- **GitHub Discussions**: For detailed technical questions
- **Office Hours**: Weekly developer Q&A sessions
- **Documentation**: This guide and linked resources

### **Contributing to Development Setup**
- Found an issue with this guide? Open an issue or PR
- Want to add a new development tool? Discuss in Discord first
- Improve documentation based on your setup experience

---

**Development Environment Ready!** You now have a complete development setup for Treasury Command Center. Start building the future of Web3 treasury management! 🚀

---

*Last Updated: July 18, 2025*  
*Document Type: Development Guide*  
*Setup Time: 30 minutes*
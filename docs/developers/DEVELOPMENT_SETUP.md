# Development Setup Guide

Complete guide for setting up Treasury Command Center development environment.

## 🛠️ Development Prerequisites

### Required Software
- **Node.js** v18+ (recommend v20 LTS)
- **Python** 3.9+ (recommend 3.11)
- **PostgreSQL** 13+ 
- **Redis** 6+
- **Git** 2.30+
- **Docker** & **Docker Compose** (optional, for containerized development)

### Recommended Tools
- **VS Code** with recommended extensions
- **pgAdmin** or **DBeaver** for database management
- **Postman** or **Insomnia** for API testing
- **GitHub CLI** for repository management

## 🚀 Quick Development Setup

### 1. Fork and Clone
```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/treasury-command-center.git
cd treasury-command-center

# Add upstream remote
git remote add upstream https://github.com/lamassu-labs/treasury-command-center.git
```

### 2. Environment Configuration
```bash
# Copy development environment template
cp env.template .env.development

# Edit development configuration
nano .env.development
```

#### Essential Development Settings
```bash
# Development mode
NODE_ENV=development
DEBUG=true

# Local databases
DATABASE_URL=postgresql://postgres:password@localhost:5432/treasury_dev
REDIS_URL=redis://localhost:6379/0

# Development ports
PORT=3000
API_PORT=8000

# Development secrets (generate new ones)
NEXTAUTH_SECRET=dev-secret-change-for-production
JWT_SECRET=dev-jwt-secret-change-for-production
API_KEY_SECRET=dev-api-key-secret
```

### 3. Database Setup
```bash
# Start databases
sudo systemctl start postgresql redis

# Create development database
createdb treasury_dev

# Create test database
createdb treasury_test

# Run migrations (when available)
cd src/backend
python -c "from database import create_tables; create_tables()"
```

### 4. Backend Development Setup
```bash
cd src/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r ../../requirements.txt
pip install -r ../../requirements-dev.txt

# Install pre-commit hooks
pre-commit install

# Run development server
python main.py
```

### 5. Frontend Development Setup
```bash
cd src/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Development Tools Setup

### VS Code Configuration
Create `.vscode/settings.json`:
```json
{
  "python.defaultInterpreterPath": "./src/backend/venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.ruffEnabled": true,
  "python.formatting.provider": "black",
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.black-formatter",
    "charliermarsh.ruff",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag"
  ]
}
```

## 🐳 Docker Development (Alternative)

### Using Docker Compose
```bash
# Start all services
docker-compose -f docker-compose.dev.yml up

# Start specific services
docker-compose -f docker-compose.dev.yml up postgres redis

# Run backend in container
docker-compose -f docker-compose.dev.yml up backend

# Run frontend in container
docker-compose -f docker-compose.dev.yml up frontend
```

### Development Container (VS Code DevContainer)
```bash
# Open in VS Code DevContainer
code .
# Command Palette: "Dev Containers: Reopen in Container"
```

## 🧪 Testing Setup

### Backend Testing
```bash
cd src/backend

# Run all tests
pytest

# Run with coverage
pytest --cov=. --cov-report=html

# Run specific test files
pytest tests/test_auth.py

# Run tests in watch mode
pytest-watch
```

### Frontend Testing
```bash
cd src/frontend

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

### Integration Testing
```bash
# Start test environment
docker-compose -f docker-compose.test.yml up -d

# Run integration tests
npm run test:integration

# Cleanup
docker-compose -f docker-compose.test.yml down
```

## 📋 Development Workflow

### 1. Branch Strategy
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Create fix branch
git checkout -b fix/issue-description

# Create docs branch
git checkout -b docs/documentation-update
```

### 2. Code Quality Checks
```bash
# Run all quality checks
npm run lint
npm run type-check
pytest --cov=.

# Auto-fix issues
npm run lint:fix
black .
isort .
```

### 3. Pre-commit Workflow
```bash
# Pre-commit hooks run automatically on commit
git add .
git commit -m "feat: add new feature"

# Manual pre-commit run
pre-commit run --all-files
```

### 4. Testing Before PR
```bash
# Backend tests
cd src/backend
pytest
mypy .
bandit -r .

# Frontend tests
cd src/frontend
npm test
npm run type-check
npm run build

# Integration tests
npm run test:integration
```

## 🔌 API Development

### Local API Testing
```bash
# Start backend API
cd src/backend
python main.py

# API will be available at:
# - http://localhost:8000
# - Documentation: http://localhost:8000/docs
# - OpenAPI spec: http://localhost:8000/openapi.json
```

### Database Migrations
```bash
# Create new migration
alembic revision --autogenerate -m "Add new table"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

### Seed Development Data
```bash
# Load sample data
python scripts/seed_dev_data.py

# Reset database
python scripts/reset_dev_db.py
```

## 🌐 Frontend Development

### Next.js Development
```bash
cd src/frontend

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Analyze bundle
npm run analyze
```

### Styling Development
```bash
# Watch Tailwind changes
npm run dev:css

# Build optimized CSS
npm run build:css

# Lint styles
npm run lint:css
```

## 🔍 Debugging

### Backend Debugging
```bash
# Start with debugger
python -m debugpy --listen 5678 --wait-for-client main.py

# VS Code launch.json for debugging
{
  "name": "Python: FastAPI",
  "type": "python",
  "request": "attach",
  "connect": {
    "host": "localhost",
    "port": 5678
  }
}
```

### Frontend Debugging
```bash
# Start with debugging enabled
npm run dev:debug

# VS Code debugging for Next.js
{
  "name": "Next.js: debug server-side",
  "type": "node",
  "request": "attach",
  "port": 9229
}
```

## 📊 Performance Monitoring

### Development Metrics
```bash
# Backend performance
python -m cProfile main.py

# Frontend performance
npm run dev -- --turbo

# Database queries
export SQLALCHEMY_ECHO=true
```

### Load Testing
```bash
# Install locust
pip install locust

# Run load tests
locust -f tests/load/locustfile.py --host=http://localhost:8000
```

## 🤝 Contributing Workflow

### 1. Issue Assignment
- Check [open issues](https://github.com/lamassu-labs/treasury-command-center/issues)
- Comment to get assigned
- Create new issues for bugs/features

### 2. Development Process
1. Fork repository
2. Create feature branch
3. Implement changes
4. Add tests
5. Update documentation
6. Submit pull request

### 3. Code Review
- All PRs require review
- Address feedback promptly
- Maintain code quality standards
- Update tests and docs

## 🆘 Troubleshooting

### Common Development Issues

#### Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Reset database connection
dropdb treasury_dev && createdb treasury_dev
```

#### Port Conflicts
```bash
# Check what's using ports
sudo lsof -i :3000
sudo lsof -i :8000

# Kill processes
sudo kill -9 <PID>
```

#### Dependency Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear pip cache
pip cache purge
```

#### Pre-commit Hook Issues
```bash
# Update hooks
pre-commit autoupdate

# Skip hooks (emergency only)
git commit --no-verify
```

## 📞 Development Support

- **Discord**: [#development channel](https://discord.gg/treasury-command-center)
- **GitHub Discussions**: [Development discussions](https://github.com/lamassu-labs/treasury-command-center/discussions)
- **Issues**: [Report development issues](https://github.com/lamassu-labs/treasury-command-center/issues)

---

**Last Updated**: July 17, 2025  
**Next**: [Contributing Guidelines](../CONTRIBUTING.md)
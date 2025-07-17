# Development Setup Guide

Complete guide for setting up Treasury Command Center development environment.

## 🏗️ Development Environment Architecture

### Complete Development Environment

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
    subgraph "Developer Workstation"
        DEV_MACHINE[Developer Machine<br/>macOS/Linux/Windows]
        IDE[VS Code + Extensions<br/>Python, TypeScript, Git]
        DOCKER_DESKTOP[Docker Desktop<br/>Container Runtime]
        GIT_CLIENT[Git Client<br/>+ GitHub CLI]
    end
    
    subgraph "Frontend Development"
        NEXT_DEV[Next.js Dev Server<br/>Port 3000<br/>Hot Reload]
        TAILWIND[Tailwind CSS<br/>Live Compilation]
        STORYBOOK[Storybook<br/>Component Library<br/>Port 6006]
        PLAYWRIGHT[Playwright<br/>E2E Testing]
    end
    
    subgraph "Backend Development"
        FASTAPI_DEV[FastAPI Dev Server<br/>Port 8000<br/>Auto Reload]
        UVICORN[Uvicorn ASGI Server<br/>Development Mode]
        PYTEST[Pytest Framework<br/>Unit + Integration Tests]
        ALEMBIC[Alembic Migrations<br/>Database Versioning]
    end
    
    subgraph "Local Services"
        POSTGRES_DEV[(PostgreSQL 15<br/>Development Database<br/>Port 5432)]
        REDIS_DEV[(Redis 7<br/>Cache + Sessions<br/>Port 6379)]
        MINIO_DEV[(MinIO S3<br/>Local File Storage<br/>Port 9000)]
        MAILHOG[MailHog<br/>Email Testing<br/>Port 8025]
    end
    
    subgraph "Development Tools"
        PGADMIN[pgAdmin 4<br/>Database Management<br/>Port 5050]
        REDIS_COMMANDER[Redis Commander<br/>Cache Management<br/>Port 8081]
        POSTMAN[Postman/Insomnia<br/>API Testing]
        BROWSER_TOOLS[Browser DevTools<br/>React DevTools]
    end
    
    subgraph "Code Quality Tools"
        PRE_COMMIT[Pre-commit Hooks<br/>Black, Ruff, Prettier]
        MYPY[MyPy<br/>Python Type Checking]
        ESLINT[ESLint + TypeScript<br/>JS/TS Linting]
        COVERAGE[Coverage Reports<br/>pytest-cov + c8]
    end
    
    subgraph "External Development Services"
        GITHUB[GitHub Repository<br/>Source Code + CI/CD]
        VERCEL_PREVIEW[Vercel Preview<br/>Branch Deployments]
        NGROK[ngrok<br/>Local Tunnel for Webhooks]
        BLOCKCHAIN_TESTNETS[Blockchain Testnets<br/>Goerli, Mumbai, etc.]
    end
    
    %% Developer workstation connections
    DEV_MACHINE --> IDE
    DEV_MACHINE --> DOCKER_DESKTOP
    DEV_MACHINE --> GIT_CLIENT
    
    %% IDE to development servers
    IDE --> NEXT_DEV
    IDE --> FASTAPI_DEV
    IDE --> PRE_COMMIT
    
    %% Frontend development flow
    NEXT_DEV --> TAILWIND
    NEXT_DEV --> STORYBOOK
    NEXT_DEV --> PLAYWRIGHT
    
    %% Backend development flow
    FASTAPI_DEV --> UVICORN
    FASTAPI_DEV --> PYTEST
    FASTAPI_DEV --> ALEMBIC
    
    %% Service connections
    FASTAPI_DEV --> POSTGRES_DEV
    FASTAPI_DEV --> REDIS_DEV
    FASTAPI_DEV --> MINIO_DEV
    NEXT_DEV --> FASTAPI_DEV
    
    %% Development tools connections
    PGADMIN --> POSTGRES_DEV
    REDIS_COMMANDER --> REDIS_DEV
    POSTMAN --> FASTAPI_DEV
    BROWSER_TOOLS --> NEXT_DEV
    
    %% Code quality connections
    PRE_COMMIT --> MYPY
    PRE_COMMIT --> ESLINT
    PYTEST --> COVERAGE
    
    %% External services
    GIT_CLIENT --> GITHUB
    NEXT_DEV --> VERCEL_PREVIEW
    FASTAPI_DEV --> NGROK
    FASTAPI_DEV --> BLOCKCHAIN_TESTNETS
    
    %% Docker containerization
    DOCKER_DESKTOP -.-> POSTGRES_DEV
    DOCKER_DESKTOP -.-> REDIS_DEV
    DOCKER_DESKTOP -.-> MINIO_DEV
    DOCKER_DESKTOP -.-> MAILHOG
    
    %% Email testing
    FASTAPI_DEV --> MAILHOG
    
    %% Styling
    classDef workstation fill:#F3F0FF,stroke:#7C3AED,stroke-width:2px
    classDef frontend fill:#7C3AED,color:#FFFFFF,stroke:#5B21B6,stroke-width:2px
    classDef backend fill:#1E40AF,color:#FFFFFF,stroke:#1E3A8A,stroke-width:2px
    classDef services fill:#059669,color:#FFFFFF,stroke:#047857,stroke-width:2px
    classDef tools fill:#C65D3C,color:#FFFFFF,stroke:#B5472A,stroke-width:2px
    classDef quality fill:#D97706,color:#FFFFFF,stroke:#B45309,stroke-width:2px
    classDef external fill:#6B7280,color:#FFFFFF,stroke:#4B5563,stroke-width:2px
    
    class DEV_MACHINE,IDE,DOCKER_DESKTOP,GIT_CLIENT workstation
    class NEXT_DEV,TAILWIND,STORYBOOK,PLAYWRIGHT frontend
    class FASTAPI_DEV,UVICORN,PYTEST,ALEMBIC backend
    class POSTGRES_DEV,REDIS_DEV,MINIO_DEV,MAILHOG services
    class PGADMIN,REDIS_COMMANDER,POSTMAN,BROWSER_TOOLS tools
    class PRE_COMMIT,MYPY,ESLINT,COVERAGE quality
    class GITHUB,VERCEL_PREVIEW,NGROK,BLOCKCHAIN_TESTNETS external
```

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

### Complete Testing Pipeline

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
    subgraph "Development Phase"
        DEV_START[Developer Starts Coding]
        UNIT_WRITE[Write Unit Tests<br/>TDD Approach]
        CODE_WRITE[Write Implementation<br/>Follow Tests]
        LOCAL_TEST[Run Local Tests<br/>pytest + jest]
    end
    
    subgraph "Pre-commit Phase"
        PRE_COMMIT_TRIGGER[Git Commit Trigger]
        CODE_FORMAT[Code Formatting<br/>Black + Prettier]
        LINT_CHECK[Linting<br/>Ruff + ESLint]
        TYPE_CHECK[Type Checking<br/>MyPy + TypeScript]
        UNIT_TESTS[Unit Tests<br/>95%+ Coverage Required]
    end
    
    subgraph "Push & CI Phase"
        GIT_PUSH[Git Push to Branch]
        GITHUB_ACTIONS[GitHub Actions Trigger]
        MATRIX_TEST[Matrix Testing<br/>Python 3.9-3.11<br/>Node 18-20]
        INTEGRATION_TESTS[Integration Tests<br/>API + Database]
    end
    
    subgraph "Quality Gates"
        SECURITY_SCAN[Security Scanning<br/>Bandit + npm audit]
        DEPENDENCY_CHECK[Dependency Check<br/>Safety + audit]
        PERFORMANCE_TEST[Performance Tests<br/>Load Testing]
        E2E_TESTS[End-to-End Tests<br/>Playwright]
    end
    
    subgraph "Pull Request Phase"
        PR_CREATE[Create Pull Request]
        CODE_REVIEW[Code Review<br/>Required Approvals]
        PREVIEW_DEPLOY[Deploy Preview<br/>Vercel + Test DB]
        MANUAL_TESTING[Manual Testing<br/>QA Validation]
    end
    
    subgraph "Merge & Deploy Phase"
        PR_MERGE[Merge to Main]
        STAGING_DEPLOY[Deploy to Staging<br/>Automated]
        SMOKE_TESTS[Smoke Tests<br/>Critical Path Validation]
        PRODUCTION_DEPLOY[Deploy to Production<br/>Blue/Green]
    end
    
    subgraph "Post-Deploy Monitoring"
        HEALTH_CHECK[Health Checks<br/>Service Monitoring]
        REGRESSION_TESTS[Regression Tests<br/>Automated Suite]
        ROLLBACK{Issues<br/>Detected?}
        SUCCESS[Deployment Success]
    end
    
    subgraph "Test Data & Environment"
        TEST_DB[(Test Database<br/>Isolated Schema)]
        MOCK_SERVICES[Mock External Services<br/>Blockchain APIs]
        TEST_FIXTURES[Test Fixtures<br/>Sample Data]
        CLEANUP[Test Cleanup<br/>Tear Down Resources]
    end
    
    %% Development flow
    DEV_START --> UNIT_WRITE
    UNIT_WRITE --> CODE_WRITE
    CODE_WRITE --> LOCAL_TEST
    LOCAL_TEST --> PRE_COMMIT_TRIGGER
    
    %% Pre-commit flow
    PRE_COMMIT_TRIGGER --> CODE_FORMAT
    CODE_FORMAT --> LINT_CHECK
    LINT_CHECK --> TYPE_CHECK
    TYPE_CHECK --> UNIT_TESTS
    
    %% CI flow
    UNIT_TESTS --> GIT_PUSH
    GIT_PUSH --> GITHUB_ACTIONS
    GITHUB_ACTIONS --> MATRIX_TEST
    MATRIX_TEST --> INTEGRATION_TESTS
    
    %% Quality gates
    INTEGRATION_TESTS --> SECURITY_SCAN
    SECURITY_SCAN --> DEPENDENCY_CHECK
    DEPENDENCY_CHECK --> PERFORMANCE_TEST
    PERFORMANCE_TEST --> E2E_TESTS
    
    %% PR flow
    E2E_TESTS --> PR_CREATE
    PR_CREATE --> CODE_REVIEW
    CODE_REVIEW --> PREVIEW_DEPLOY
    PREVIEW_DEPLOY --> MANUAL_TESTING
    
    %% Deploy flow
    MANUAL_TESTING --> PR_MERGE
    PR_MERGE --> STAGING_DEPLOY
    STAGING_DEPLOY --> SMOKE_TESTS
    SMOKE_TESTS --> PRODUCTION_DEPLOY
    
    %% Post-deploy monitoring
    PRODUCTION_DEPLOY --> HEALTH_CHECK
    HEALTH_CHECK --> REGRESSION_TESTS
    REGRESSION_TESTS --> ROLLBACK
    ROLLBACK -->|No Issues| SUCCESS
    ROLLBACK -->|Issues Found| STAGING_DEPLOY
    
    %% Test environment connections
    INTEGRATION_TESTS --> TEST_DB
    INTEGRATION_TESTS --> MOCK_SERVICES
    E2E_TESTS --> TEST_FIXTURES
    SMOKE_TESTS --> CLEANUP
    
    %% Error handling paths
    LOCAL_TEST -.->|Fails| UNIT_WRITE
    UNIT_TESTS -.->|Fails| CODE_WRITE
    INTEGRATION_TESTS -.->|Fails| DEV_START
    E2E_TESTS -.->|Fails| CODE_REVIEW
    SMOKE_TESTS -.->|Fails| ROLLBACK
    
    %% Styling
    classDef development fill:#F3F0FF,stroke:#7C3AED,stroke-width:2px
    classDef precommit fill:#7C3AED,color:#FFFFFF,stroke:#5B21B6,stroke-width:2px
    classDef ci fill:#1E40AF,color:#FFFFFF,stroke:#1E3A8A,stroke-width:2px
    classDef quality fill:#C65D3C,color:#FFFFFF,stroke:#B5472A,stroke-width:2px
    classDef pr fill:#059669,color:#FFFFFF,stroke:#047857,stroke-width:2px
    classDef deploy fill:#D97706,color:#FFFFFF,stroke:#B45309,stroke-width:2px
    classDef monitoring fill:#6B7280,color:#FFFFFF,stroke:#4B5563,stroke-width:2px
    classDef testenv fill:#DC2626,color:#FFFFFF,stroke:#B91C1C,stroke-width:2px
    classDef decision fill:#F3F0FF,stroke:#7C3AED,stroke-width:2px
    
    class DEV_START,UNIT_WRITE,CODE_WRITE,LOCAL_TEST development
    class PRE_COMMIT_TRIGGER,CODE_FORMAT,LINT_CHECK,TYPE_CHECK,UNIT_TESTS precommit
    class GIT_PUSH,GITHUB_ACTIONS,MATRIX_TEST,INTEGRATION_TESTS ci
    class SECURITY_SCAN,DEPENDENCY_CHECK,PERFORMANCE_TEST,E2E_TESTS quality
    class PR_CREATE,CODE_REVIEW,PREVIEW_DEPLOY,MANUAL_TESTING pr
    class PR_MERGE,STAGING_DEPLOY,SMOKE_TESTS,PRODUCTION_DEPLOY deploy
    class HEALTH_CHECK,REGRESSION_TESTS,SUCCESS monitoring
    class TEST_DB,MOCK_SERVICES,TEST_FIXTURES,CLEANUP testenv
    class ROLLBACK decision
```

## 📋 Development Workflow

### Git Workflow & Branch Strategy

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
gitgraph
    commit id: "Initial commit"
    
    branch develop
    checkout develop
    commit id: "Setup development"
    
    branch feature/user-auth
    checkout feature/user-auth
    commit id: "Add login component"
    commit id: "Add auth middleware"
    commit id: "Add tests"
    
    checkout develop
    merge feature/user-auth
    commit id: "Merge: User authentication"
    
    branch feature/wallet-integration
    checkout feature/wallet-integration
    commit id: "Add wallet service"
    commit id: "Add balance tracking"
    
    checkout develop
    branch hotfix/security-patch
    checkout hotfix/security-patch
    commit id: "Fix security issue"
    
    checkout main
    merge hotfix/security-patch
    commit id: "Hotfix: Security patch"
    tag: "v1.0.1"
    
    checkout develop
    merge hotfix/security-patch
    merge feature/wallet-integration
    commit id: "Merge: Wallet integration"
    
    branch release/v1.1.0
    checkout release/v1.1.0
    commit id: "Bump version"
    commit id: "Update changelog"
    
    checkout main
    merge release/v1.1.0
    commit id: "Release v1.1.0"
    tag: "v1.1.0"
    
    checkout develop
    merge release/v1.1.0
    
    branch feature/multi-chain
    checkout feature/multi-chain
    commit id: "Add Polygon support"
    commit id: "Add Arbitrum support"
```

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

### Code Quality Gates

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
    subgraph "Code Submission"
        DEVELOPER[Developer Submits Code]
        GIT_COMMIT[Git Commit Attempt]
        PRE_COMMIT_HOOK[Pre-commit Hook Trigger]
    end
    
    subgraph "Formatting & Style Gates"
        BLACK[Black Code Formatter<br/>Python Formatting]
        PRETTIER[Prettier<br/>JS/TS/JSON/CSS Formatting]
        ISORT[isort<br/>Python Import Sorting]
        EDITORCONFIG[EditorConfig<br/>Consistent File Formatting]
    end
    
    subgraph "Linting Gates"
        RUFF[Ruff<br/>Python Linting<br/>⚡ Fast & Comprehensive]
        ESLINT[ESLint<br/>JavaScript/TypeScript<br/>Airbnb Config]
        STYLELINT[Stylelint<br/>CSS/SCSS Linting]
        MARKDOWNLINT[markdownlint<br/>Documentation Standards]
    end
    
    subgraph "Type Safety Gates"
        MYPY[MyPy<br/>Python Static Types<br/>strict mode]
        TYPESCRIPT[TypeScript Compiler<br/>tsc --noEmit<br/>Strict Configuration]
        PYDANTIC[Pydantic Validation<br/>Runtime Type Checking]
    end
    
    subgraph "Security Gates"
        BANDIT[Bandit<br/>Python Security Scanner<br/>OWASP Standards]
        NPM_AUDIT[npm audit<br/>JavaScript Dependency Scan]
        SAFETY[Safety<br/>Python Dependency Check]
        SEMGREP[Semgrep<br/>Static Analysis Security]
    end
    
    subgraph "Test Coverage Gates"
        PYTEST_COV[pytest-cov<br/>95%+ Coverage Required<br/>Branch Coverage]
        JEST_COV[Jest Coverage<br/>90%+ Frontend Coverage<br/>Statements + Branches]
        INTEGRATION_COV[Integration Coverage<br/>API Endpoint Coverage]
    end
    
    subgraph "Documentation Gates"
        DOCSTRING_COV[docstring-coverage<br/>API Documentation<br/>95%+ Required]
        SPHINX_BUILD[Sphinx Build<br/>Documentation Generation]
        LINK_CHECK[Link Checker<br/>Validate External Links]
    end
    
    subgraph "Performance Gates"
        LOAD_TIME[Bundle Size Check<br/>< 500KB Initial Load]
        CORE_WEB_VITALS[Core Web Vitals<br/>LCP, FID, CLS Checks]
        API_PERFORMANCE[API Response Time<br/>< 200ms P95]
    end
    
    subgraph "Quality Decisions"
        ALL_CHECKS_PASS{All Quality<br/>Gates Pass?}
        COMMIT_ALLOWED[✅ Commit Allowed<br/>Push to Repository]
        COMMIT_BLOCKED[❌ Commit Blocked<br/>Fix Issues Required]
        AUTO_FIX{Auto-fixable<br/>Issues?}
        MANUAL_FIX[Manual Fix Required<br/>Developer Action Needed]
    end
    
    %% Initial flow
    DEVELOPER --> GIT_COMMIT
    GIT_COMMIT --> PRE_COMMIT_HOOK
    
    %% Formatting gates
    PRE_COMMIT_HOOK --> BLACK
    PRE_COMMIT_HOOK --> PRETTIER
    PRE_COMMIT_HOOK --> ISORT
    PRE_COMMIT_HOOK --> EDITORCONFIG
    
    %% Linting gates
    BLACK --> RUFF
    PRETTIER --> ESLINT
    ISORT --> STYLELINT
    EDITORCONFIG --> MARKDOWNLINT
    
    %% Type safety gates
    RUFF --> MYPY
    ESLINT --> TYPESCRIPT
    MYPY --> PYDANTIC
    
    %% Security gates
    TYPESCRIPT --> BANDIT
    PYDANTIC --> NPM_AUDIT
    BANDIT --> SAFETY
    NPM_AUDIT --> SEMGREP
    
    %% Test coverage gates
    SAFETY --> PYTEST_COV
    SEMGREP --> JEST_COV
    PYTEST_COV --> INTEGRATION_COV
    
    %% Documentation gates
    JEST_COV --> DOCSTRING_COV
    INTEGRATION_COV --> SPHINX_BUILD
    DOCSTRING_COV --> LINK_CHECK
    
    %% Performance gates
    SPHINX_BUILD --> LOAD_TIME
    LINK_CHECK --> CORE_WEB_VITALS
    LOAD_TIME --> API_PERFORMANCE
    
    %% Decision logic
    CORE_WEB_VITALS --> ALL_CHECKS_PASS
    API_PERFORMANCE --> ALL_CHECKS_PASS
    
    ALL_CHECKS_PASS -->|Yes| COMMIT_ALLOWED
    ALL_CHECKS_PASS -->|No| COMMIT_BLOCKED
    
    COMMIT_BLOCKED --> AUTO_FIX
    AUTO_FIX -->|Yes| BLACK
    AUTO_FIX -->|No| MANUAL_FIX
    MANUAL_FIX --> DEVELOPER
    
    %% Success path
    COMMIT_ALLOWED --> GIT_COMMIT
    
    %% Bypass for emergency fixes (with warnings)
    COMMIT_BLOCKED -.->|--no-verify<br/>Emergency Only| COMMIT_ALLOWED
    
    %% Styling
    classDef submission fill:#F3F0FF,stroke:#7C3AED,stroke-width:2px
    classDef formatting fill:#7C3AED,color:#FFFFFF,stroke:#5B21B6,stroke-width:2px
    classDef linting fill:#1E40AF,color:#FFFFFF,stroke:#1E3A8A,stroke-width:2px
    classDef types fill:#C65D3C,color:#FFFFFF,stroke:#B5472A,stroke-width:2px
    classDef security fill:#DC2626,color:#FFFFFF,stroke:#B91C1C,stroke-width:2px
    classDef coverage fill:#059669,color:#FFFFFF,stroke:#047857,stroke-width:2px
    classDef docs fill:#D97706,color:#FFFFFF,stroke:#B45309,stroke-width:2px
    classDef performance fill:#6B7280,color:#FFFFFF,stroke:#4B5563,stroke-width:2px
    classDef decision fill:#F3F0FF,stroke:#7C3AED,stroke-width:3px
    classDef success fill:#059669,color:#FFFFFF,stroke:#047857,stroke-width:2px
    classDef blocked fill:#DC2626,color:#FFFFFF,stroke:#B91C1C,stroke-width:2px
    
    class DEVELOPER,GIT_COMMIT,PRE_COMMIT_HOOK submission
    class BLACK,PRETTIER,ISORT,EDITORCONFIG formatting
    class RUFF,ESLINT,STYLELINT,MARKDOWNLINT linting
    class MYPY,TYPESCRIPT,PYDANTIC types
    class BANDIT,NPM_AUDIT,SAFETY,SEMGREP security
    class PYTEST_COV,JEST_COV,INTEGRATION_COV coverage
    class DOCSTRING_COV,SPHINX_BUILD,LINK_CHECK docs
    class LOAD_TIME,CORE_WEB_VITALS,API_PERFORMANCE performance
    class ALL_CHECKS_PASS,AUTO_FIX decision
    class COMMIT_ALLOWED success
    class COMMIT_BLOCKED,MANUAL_FIX blocked
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
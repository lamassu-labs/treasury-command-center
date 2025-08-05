---
id: api-reference
title: API Reference
sidebar_label: API Reference
sidebar_position: 1
---
# Treasury Command Center API Documentation

Comprehensive API reference for Treasury Command Center's RESTful API.

## 🌐 API Overview

The Treasury Command Center API provides programmatic access to all platform features, enabling:
- Multi-chain treasury monitoring
- Real-time balance tracking
- Alert and notification management
- Analytics and reporting
- User and authentication management

### Base URL
```
Production: https://api.treasury-command-center.com
Development: http://localhost:8000
```

### API Version
Current Version: **v1**  
All endpoints are prefixed with `/api/v1/`

## 🔐 Authentication

Treasury Command Center uses JWT-based authentication with API keys for service-to-service communication.

### Authentication Methods

#### 1. JWT Authentication (Web Application)
```bash
# Login to get JWT token
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "password"
}

# Use token in subsequent requests
Authorization: Bearer <jwt_token>
```

#### 2. API Key Authentication (Programmatic Access)
```bash
# Use API key in header
X-API-Key: <your_api_key>
```

### Complete Authentication Flow

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
sequenceDiagram
    participant C as Client Application
    participant API as API Gateway
    participant AUTH as Auth Service
    participant DB as Database
    participant CACHE as Redis Cache
    
    Note over C,CACHE: JWT Authentication Flow
    
    C->>API: POST /api/v1/auth/login<br/>{email, password}
    API->>AUTH: Validate Credentials
    AUTH->>DB: Check User Credentials
    DB-->>AUTH: User Data + Permissions
    
    alt Valid Credentials
        AUTH->>AUTH: Generate JWT Token<br/>+ Refresh Token
        AUTH->>CACHE: Store Session Data<br/>TTL: 24 hours
        AUTH-->>API: JWT + Refresh + User Info
        API-->>C: 200 OK<br/>{token, refresh_token, user}
    else Invalid Credentials
        AUTH-->>API: Invalid Credentials
        API-->>C: 401 Unauthorized<br/>{error: "Invalid credentials"}
    end
    
    Note over C,CACHE: API Request with JWT
    
    C->>API: GET /api/v1/wallets<br/>Authorization: Bearer {jwt}
    API->>API: Validate JWT Signature<br/>Check Expiration
    
    alt Valid JWT
        API->>CACHE: Get User Session
        CACHE-->>API: User ID + Permissions
        API->>AUTH: Check Resource Access
        AUTH-->>API: Access Granted
        API->>API: Forward to Service
        API-->>C: 200 OK + Data
    else Invalid/Expired JWT
        API-->>C: 401 Unauthorized<br/>{error: "Token expired"}
    end
    
    Note over C,CACHE: Token Refresh Flow
    
    C->>API: POST /api/v1/auth/refresh<br/>{refresh_token}
    API->>AUTH: Validate Refresh Token
    AUTH->>CACHE: Check Refresh Token
    
    alt Valid Refresh Token
        AUTH->>AUTH: Generate New JWT
        AUTH->>CACHE: Update Session<br/>Extend TTL
        AUTH-->>API: New JWT Token
        API-->>C: 200 OK<br/>{token, expires_at}
    else Invalid Refresh Token
        AUTH->>CACHE: Clear Session
        AUTH-->>API: Invalid Token
        API-->>C: 401 Unauthorized<br/>"Please login again"
    end
```

### API Key Authentication Flow

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
sequenceDiagram
    participant SVC as Service/Script
    participant API as API Gateway
    participant AUTH as Auth Service
    participant RATE as Rate Limiter
    participant DB as Database
    
    Note over SVC,DB: API Key Generation
    
    SVC->>API: POST /api/v1/auth/api-keys<br/>Authorization: Bearer {jwt}<br/>{name, permissions, expires_at}
    API->>AUTH: Validate User Session
    AUTH->>DB: Create API Key Record<br/>Hash Key + Store Metadata
    DB-->>AUTH: API Key ID + Hashed Key
    AUTH-->>API: Plain API Key (One Time)
    API-->>SVC: 201 Created<br/>{api_key, key_id, permissions}
    
    Note over SVC,DB: API Request with Key
    
    SVC->>API: GET /api/v1/balances<br/>X-API-Key: {api_key}
    API->>RATE: Check Rate Limits<br/>Per Key + Per IP
    
    alt Within Rate Limits
        RATE-->>API: Rate Limit OK
        API->>AUTH: Validate API Key<br/>Hash + Compare
        AUTH->>DB: Get Key Permissions<br/>Check Expiration
        DB-->>AUTH: Key Valid + Permissions
        
        alt Valid API Key + Permissions
            AUTH-->>API: Access Granted<br/>User Context
            API->>API: Forward to Service<br/>Add User Context
            API-->>SVC: 200 OK + Data<br/>X-RateLimit-*: Headers
        else Invalid Key or Insufficient Permissions
            AUTH-->>API: Access Denied
            API-->>SVC: 403 Forbidden<br/>{error: "Invalid API key"}
        end
    else Rate Limit Exceeded
        RATE-->>API: Rate Limit Exceeded
        API-->>SVC: 429 Too Many Requests<br/>Retry-After: {seconds}
    end
    
    Note over SVC,DB: API Key Management
    
    SVC->>API: GET /api/v1/auth/api-keys<br/>Authorization: Bearer {jwt}
    API->>AUTH: List User's API Keys
    AUTH->>DB: Get Keys (No Plain Text)
    DB-->>AUTH: Key Metadata Only
    AUTH-->>API: Keys List
    API-->>SVC: 200 OK<br/>[{id, name, created_at, last_used}]
    
    SVC->>API: DELETE /api/v1/auth/api-keys/{id}<br/>Authorization: Bearer {jwt}
    API->>AUTH: Revoke API Key
    AUTH->>DB: Mark Key as Revoked
    DB-->>AUTH: Key Revoked
    AUTH-->>API: Revocation Success
    API-->>SVC: 204 No Content
```

### Getting API Keys
1. Log in to Treasury Command Center
2. Navigate to "Settings" → "API Keys"
3. Generate new API key with appropriate permissions
4. Store securely and use in API requests

## 📚 Core Endpoints

### Authentication Endpoints
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh JWT token
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user info

### Wallet Management
- `GET /api/v1/wallets` - List user wallets
- `POST /api/v1/wallets` - Add new wallet
- `GET /api/v1/wallets/{id}` - Get wallet details
- `PUT /api/v1/wallets/{id}` - Update wallet
- `DELETE /api/v1/wallets/{id}` - Remove wallet

### Balance Tracking
- `GET /api/v1/balances` - Get all balances
- `GET /api/v1/balances/{wallet_id}` - Get wallet balances
- `GET /api/v1/balances/history` - Balance history
- `POST /api/v1/balances/sync` - Force balance sync

### Analytics & Reporting
- `GET /api/v1/analytics/portfolio` - Portfolio analytics
- `GET /api/v1/analytics/performance` - Performance metrics
- `GET /api/v1/reports/summary` - Treasury summary
- `GET /api/v1/reports/export` - Export data

### Alerts & Notifications
- `GET /api/v1/alerts` - List alerts
- `POST /api/v1/alerts` - Create alert
- `PUT /api/v1/alerts/{id}` - Update alert
- `DELETE /api/v1/alerts/{id}` - Delete alert

## 📝 API Examples

### Add New Wallet
```bash
curl -X POST "http://localhost:8000/api/v1/wallets" \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x742d35Cc6634C0532925a3b8D42C81Da2b78D8d9",
    "network": "ethereum",
    "label": "Main Treasury Wallet",
    "description": "Primary treasury wallet for operations"
  }'
```

### Get Portfolio Analytics
```bash
curl -X GET "http://localhost:8000/api/v1/analytics/portfolio" \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json"
```

### Create Balance Alert
```bash
curl -X POST "http://localhost:8000/api/v1/alerts" \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "wallet_id": "wallet_123",
    "alert_type": "balance_threshold",
    "threshold": 1000000,
    "operator": "lt",
    "notification_methods": ["email", "slack"]
  }'
```

## 🔄 Complete API Request Lifecycle

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
    subgraph "Client Layer"
        CLIENT[Client Application<br/>Web/Mobile/Script]
        REQUEST[Prepare API Request<br/>Headers + Body + Auth]
    end
    
    subgraph "Edge Layer"
        CDN[CDN/Edge Cache<br/>Static Response Caching]
        WAF[Web Application Firewall<br/>Security Filtering]
        RATE_LIMITER[Rate Limiter<br/>Per-User/IP Limits]
    end
    
    subgraph "API Gateway"
        GATEWAY[API Gateway<br/>Request Routing]
        AUTH_MIDDLEWARE[Authentication<br/>JWT/API Key Validation]
        CORS[CORS Handler<br/>Cross-Origin Requests]
        VALIDATOR[Request Validator<br/>Schema & Input Validation]
    end
    
    subgraph "Business Logic"
        CONTROLLER[Service Controller<br/>Business Logic]
        PERMISSION[Permission Check<br/>Resource Authorization]
        CACHE_CHECK{Cache Hit?}
        CACHE_STORE[(Redis Cache<br/>Response Caching)]
    end
    
    subgraph "Data Layer"
        DATABASE[(PostgreSQL<br/>Primary Data)]
        BLOCKCHAIN[Blockchain APIs<br/>External Data]
        EXTERNAL[External APIs<br/>Price/Market Data]
    end
    
    subgraph "Response Processing"
        SERIALIZER[Response Serializer<br/>Data Transformation]
        FORMATTER[Response Formatter<br/>JSON/XML Output]
        LOGGER[Request Logger<br/>Audit & Analytics]
    end
    
    %% Request flow
    CLIENT --> REQUEST
    REQUEST --> CDN
    CDN --> WAF
    WAF --> RATE_LIMITER
    
    RATE_LIMITER --> GATEWAY
    GATEWAY --> AUTH_MIDDLEWARE
    AUTH_MIDDLEWARE --> CORS
    CORS --> VALIDATOR
    
    VALIDATOR --> CONTROLLER
    CONTROLLER --> PERMISSION
    PERMISSION --> CACHE_CHECK
    
    %% Cache decision
    CACHE_CHECK -->|Hit| CACHE_STORE
    CACHE_CHECK -->|Miss| DATABASE
    CACHE_CHECK -->|Miss| BLOCKCHAIN
    CACHE_CHECK -->|Miss| EXTERNAL
    
    %% Data processing
    DATABASE --> CONTROLLER
    BLOCKCHAIN --> CONTROLLER
    EXTERNAL --> CONTROLLER
    CONTROLLER --> CACHE_STORE
    
    %% Response flow
    CACHE_STORE --> SERIALIZER
    CONTROLLER --> SERIALIZER
    SERIALIZER --> FORMATTER
    FORMATTER --> LOGGER
    LOGGER --> GATEWAY
    
    %% Return to client
    GATEWAY --> RATE_LIMITER
    RATE_LIMITER --> CDN
    CDN --> CLIENT
    
    %% Error paths
    WAF -.->|Block| CLIENT
    RATE_LIMITER -.->|429| CLIENT
    AUTH_MIDDLEWARE -.->|401| CLIENT
    PERMISSION -.->|403| CLIENT
    VALIDATOR -.->|400| CLIENT
    DATABASE -.->|500| CONTROLLER
    
    %% Styling
    classDef client fill:#F3F0FF,stroke:#7C3AED,stroke-width:2px
    classDef edge fill:#DC2626,color:#FFFFFF,stroke:#B91C1C,stroke-width:2px
    classDef gateway fill:#7C3AED,color:#FFFFFF,stroke:#5B21B6,stroke-width:2px
    classDef business fill:#1E40AF,color:#FFFFFF,stroke:#1E3A8A,stroke-width:2px
    classDef data fill:#059669,color:#FFFFFF,stroke:#047857,stroke-width:2px
    classDef response fill:#C65D3C,color:#FFFFFF,stroke:#B5472A,stroke-width:2px
    classDef decision fill:#D97706,color:#FFFFFF,stroke:#B45309,stroke-width:2px
    
    class CLIENT,REQUEST client
    class CDN,WAF,RATE_LIMITER edge
    class GATEWAY,AUTH_MIDDLEWARE,CORS,VALIDATOR gateway
    class CONTROLLER,PERMISSION,CACHE_STORE business
    class DATABASE,BLOCKCHAIN,EXTERNAL data
    class SERIALIZER,FORMATTER,LOGGER response
    class CACHE_CHECK decision
```

## 📋 Request/Response Format

### Standard Response Format
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Success message",
  "timestamp": "2025-07-17T14:00:00Z",
  "request_id": "req_123456"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Detailed error message",
    "details": {
      // Additional error context
    }
  },
  "timestamp": "2025-07-17T14:00:00Z",
  "request_id": "req_123456"
}
```

## 🔄 Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour
- **Burst limit**: 50 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642694400
```

## 📊 Supported Networks

Treasury Command Center supports the following blockchain networks:

| Network | Chain ID | Native Token | Status |
|---------|----------|--------------|--------|
| Ethereum | 1 | ETH | ✅ Active |
| Polygon | 137 | MATIC | ✅ Active |
| Arbitrum | 42161 | ETH | ✅ Active |
| Optimism | 10 | ETH | ✅ Active |
| Cardano | - | ADA | 🚧 Beta |
| Solana | - | SOL | 🚧 Beta |
| Bitcoin | - | BTC | 📋 Planned |

## 🛠️ SDK & Libraries

### Official SDKs
- **JavaScript/TypeScript**: `npm install @treasury-cc/sdk`
- **Python**: `pip install treasury-command-center`
- **Go**: Coming soon
- **Rust**: Community contribution welcome

### Example Usage (JavaScript)
```javascript
import { TreasuryCC } from '@treasury-cc/sdk';

const client = new TreasuryCC({
  apiKey: 'your_api_key',
  baseUrl: 'http://localhost:8000'
});

// Get portfolio analytics
const analytics = await client.analytics.getPortfolio();
console.log(analytics);
```

## 🧪 Testing

### Sandbox Environment
Use our sandbox environment for testing:
- **Base URL**: `https://sandbox-api.treasury-command-center.com`
- **Test API Keys**: Available in developer dashboard
- **Test Data**: Pre-populated wallets and transactions

### Postman Collection
Import our Postman collection for easy API testing:
```bash
curl -o treasury-cc-api.json https://api.treasury-command-center.com/postman
```

## 📖 Additional Resources

- **[WebSocket API](WEBSOCKET.md)** - Real-time data streams
- **[Webhook Guide](WEBHOOKS.md)** - Event notifications
- **[Error Codes](ERROR_CODES.md)** - Complete error reference
- **[Changelog](CHANGELOG.md)** - API version history
- **[Migration Guide](MIGRATION.md)** - Upgrading between versions

## 🤝 Support

- **API Issues**: [GitHub Issues](https://github.com/lamassu-labs/treasury-command-center/issues)
- **Discord**: [Developer Channel](https://discord.gg/treasury-command-center)
- **Email**: api-support@treasury-command-center.com

---

**Last Updated**: July 17, 2025  
**API Version**: v1.0.0
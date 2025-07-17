# Multi-Chain Blockchain Setup

Complete guide for configuring Treasury Command Center to work with multiple blockchain networks.

## 🌐 Supported Networks

Treasury Command Center provides comprehensive support for major blockchain networks:

### Tier 1 Networks (Full Support)
| Network | Chain ID | Native Token | RPC Endpoints | Status |
|---------|----------|--------------|---------------|--------|
| Ethereum | 1 | ETH | Alchemy, Infura, QuickNode | ✅ Production |
| Polygon | 137 | MATIC | Alchemy, QuickNode | ✅ Production |
| Arbitrum One | 42161 | ETH | Alchemy, Arbitrum RPC | ✅ Production |
| Optimism | 10 | ETH | Alchemy, Optimism RPC | ✅ Production |

### Tier 2 Networks (Beta Support)
| Network | Chain ID | Native Token | RPC Endpoints | Status |
|---------|----------|--------------|---------------|--------|
| Cardano | - | ADA | Blockfrost API | 🧪 Beta |
| Solana | - | SOL | Solana RPC, GenesysGo | 🧪 Beta |
| Avalanche | 43114 | AVAX | Avalanche RPC | 🧪 Beta |
| BNB Chain | 56 | BNB | BNB RPC, Ankr | 🧪 Beta |

### Tier 3 Networks (Planned)
| Network | Native Token | Expected Release | Status |
|---------|--------------|------------------|--------|
| Bitcoin | BTC | Q4 2025 | 📋 Planned |
| Cosmos | ATOM | Q1 2026 | 📋 Planned |
| Polkadot | DOT | Q1 2026 | 📋 Planned |
| Tezos | XTZ | Q2 2026 | 📋 Planned |

## ⚙️ Network Configuration

### 1. Environment Setup

#### Ethereum Mainnet
```bash
# Primary RPC endpoint (required)
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# WebSocket endpoint for real-time updates (optional)
ETHEREUM_WSS_URL=wss://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Archive node for historical data (optional)
ETHEREUM_ARCHIVE_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Backup RPC endpoints
ETHEREUM_RPC_BACKUP_1=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
ETHEREUM_RPC_BACKUP_2=https://rpc.ankr.com/eth
```

#### Polygon
```bash
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
POLYGON_WSS_URL=wss://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
POLYGON_RPC_BACKUP_1=https://polygon-rpc.com
POLYGON_RPC_BACKUP_2=https://rpc.ankr.com/polygon
```

#### Arbitrum One
```bash
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
ARBITRUM_WSS_URL=wss://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
ARBITRUM_RPC_BACKUP_1=https://arb1.arbitrum.io/rpc
ARBITRUM_RPC_BACKUP_2=https://rpc.ankr.com/arbitrum
```

#### Optimism
```bash
OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/YOUR_API_KEY
OPTIMISM_WSS_URL=wss://opt-mainnet.g.alchemy.com/v2/YOUR_API_KEY
OPTIMISM_RPC_BACKUP_1=https://mainnet.optimism.io
OPTIMISM_RPC_BACKUP_2=https://rpc.ankr.com/optimism
```

### 2. Non-EVM Networks

#### Cardano
```bash
# Blockfrost API configuration
CARDANO_NETWORK=mainnet
BLOCKFROST_PROJECT_ID=mainnetXXXXXXXXXXXXXXXX
BLOCKFROST_API_URL=https://cardano-mainnet.blockfrost.io/api/v0

# Backup providers
CARDANO_RPC_BACKUP_1=https://cardano-mainnet.blockfrost.io/api/v0
```

#### Solana
```bash
# Primary RPC endpoint
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_WSS_URL=wss://api.mainnet-beta.solana.com

# GenesysGo endpoints
SOLANA_RPC_BACKUP_1=https://ssc-dao.genesysgo.net
SOLANA_WSS_BACKUP_1=wss://ssc-dao.genesysgo.net

# Commitment level for transactions
SOLANA_COMMITMENT=confirmed
```

## 🔧 Advanced Configuration

### Rate Limiting Configuration
```bash
# Per-network rate limits (requests per second)
ETHEREUM_RATE_LIMIT=10
POLYGON_RATE_LIMIT=15
ARBITRUM_RATE_LIMIT=10
OPTIMISM_RATE_LIMIT=10
CARDANO_RATE_LIMIT=5
SOLANA_RATE_LIMIT=20

# Burst limits for short periods
ETHEREUM_BURST_LIMIT=50
POLYGON_BURST_LIMIT=75
```

### Connection Pooling
```bash
# Maximum concurrent connections per network
ETHEREUM_MAX_CONNECTIONS=10
POLYGON_MAX_CONNECTIONS=8
ARBITRUM_MAX_CONNECTIONS=6
OPTIMISM_MAX_CONNECTIONS=6

# Connection timeout settings (milliseconds)
RPC_TIMEOUT=30000
WS_TIMEOUT=60000
```

### Retry Configuration
```bash
# Retry attempts for failed requests
MAX_RETRY_ATTEMPTS=3
RETRY_DELAY_MS=1000
EXPONENTIAL_BACKOFF=true

# Circuit breaker settings
CIRCUIT_BREAKER_ENABLED=true
FAILURE_THRESHOLD=5
RECOVERY_TIMEOUT=30000
```

## 🏗️ Network-Specific Setup

### Ethereum Ecosystem (EVM)

#### Smart Contract Integration
```typescript
// src/services/ethereum/contracts.ts
export const SUPPORTED_TOKENS = {
  ethereum: {
    USDC: '0xA0b86a33E6441D45f8B54BBF8f3F5E2d7E5F1A2A',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  },
  polygon: {
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
  }
};
```

#### Gas Price Optimization
```typescript
// src/services/ethereum/gasPrice.ts
interface GasConfig {
  strategy: 'fast' | 'standard' | 'slow';
  maxGasPrice: number;
  gasLimit: number;
}

export const GAS_CONFIGS: Record<string, GasConfig> = {
  ethereum: {
    strategy: 'standard',
    maxGasPrice: 100, // gwei
    gasLimit: 21000
  },
  polygon: {
    strategy: 'fast',
    maxGasPrice: 500, // gwei
    gasLimit: 21000
  }
};
```

### Cardano Integration

#### Address Format Validation
```typescript
// src/services/cardano/address.ts
import * as CardanoWasm from '@emurgo/cardano-serialization-lib-nodejs';

export function validateCardanoAddress(address: string): boolean {
  try {
    const addr = CardanoWasm.Address.from_bech32(address);
    return addr !== null;
  } catch {
    return false;
  }
}
```

#### UTXO Management
```typescript
// src/services/cardano/utxo.ts
interface CardanoUTXO {
  txHash: string;
  outputIndex: number;
  amount: string;
  assets: Array<{
    policyId: string;
    assetName: string;
    quantity: string;
  }>;
}

export async function getUTXOs(address: string): Promise<CardanoUTXO[]> {
  const response = await fetch(`${process.env.BLOCKFROST_API_URL}/addresses/${address}/utxos`, {
    headers: {
      'project_id': process.env.BLOCKFROST_PROJECT_ID!
    }
  });
  return response.json();
}
```

### Solana Integration

#### Account Validation
```typescript
// src/services/solana/account.ts
import { PublicKey } from '@solana/web3.js';

export function validateSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}
```

#### Token Account Handling
```typescript
// src/services/solana/tokens.ts
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export async function getSPLTokenAccounts(ownerAddress: string) {
  const connection = new Connection(process.env.SOLANA_RPC_URL!);
  const publicKey = new PublicKey(ownerAddress);
  
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    { programId: TOKEN_PROGRAM_ID }
  );
  
  return tokenAccounts.value.map(account => ({
    mint: account.account.data.parsed.info.mint,
    amount: account.account.data.parsed.info.tokenAmount.uiAmount
  }));
}
```

## 🔄 Multi-Chain Balance Aggregation

### Balance Service Architecture
```typescript
// src/services/balance/aggregator.ts
interface NetworkBalance {
  network: string;
  nativeBalance: string;
  tokens: Array<{
    address: string;
    symbol: string;
    balance: string;
    decimals: number;
    usdValue?: number;
  }>;
}

export class MultiChainBalanceAggregator {
  async getPortfolioBalance(wallets: WalletConfig[]): Promise<NetworkBalance[]> {
    const balancePromises = wallets.map(wallet => 
      this.getNetworkBalance(wallet.network, wallet.address)
    );
    
    return Promise.all(balancePromises);
  }
  
  private async getNetworkBalance(network: string, address: string): Promise<NetworkBalance> {
    switch (network) {
      case 'ethereum':
        return this.getEthereumBalance(address);
      case 'cardano':
        return this.getCardanoBalance(address);
      case 'solana':
        return this.getSolanaBalance(address);
      default:
        throw new Error(`Unsupported network: ${network}`);
    }
  }
}
```

### Cross-Chain Price Aggregation
```typescript
// src/services/price/aggregator.ts
interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  source: string;
  timestamp: number;
}

export class PriceAggregator {
  private sources = ['coingecko', 'chainlink', 'pyth'];
  
  async getTokenPrice(symbol: string, network?: string): Promise<PriceData> {
    // Implement price aggregation logic
    const prices = await Promise.all(
      this.sources.map(source => this.fetchPrice(source, symbol))
    );
    
    return this.aggregatePrices(prices);
  }
}
```

## 🧪 Testing Multi-Chain Setup

### Network Connection Tests
```bash
# Test Ethereum connection
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  $ETHEREUM_RPC_URL

# Test Cardano connection
curl -H "project_id: $BLOCKFROST_PROJECT_ID" \
  $BLOCKFROST_API_URL/health

# Test Solana connection
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"getSlot"}' \
  $SOLANA_RPC_URL
```

### Integration Tests
```typescript
// tests/integration/multichain.test.ts
describe('Multi-Chain Integration', () => {
  test('should connect to all configured networks', async () => {
    const networks = ['ethereum', 'polygon', 'arbitrum', 'optimism'];
    
    for (const network of networks) {
      const health = await checkNetworkHealth(network);
      expect(health.connected).toBe(true);
      expect(health.latency).toBeLessThan(5000);
    }
  });
  
  test('should aggregate balances across networks', async () => {
    const wallets = [
      { network: 'ethereum', address: '0x...' },
      { network: 'polygon', address: '0x...' }
    ];
    
    const aggregator = new MultiChainBalanceAggregator();
    const balances = await aggregator.getPortfolioBalance(wallets);
    
    expect(balances).toHaveLength(2);
    expect(balances[0].network).toBe('ethereum');
    expect(balances[1].network).toBe('polygon');
  });
});
```

## 🔧 Troubleshooting

### Common Issues

#### RPC Endpoint Issues
```bash
# Check endpoint accessibility
curl -I $ETHEREUM_RPC_URL

# Test with different method
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}' \
  $ETHEREUM_RPC_URL
```

#### Rate Limiting
```bash
# Monitor rate limits in logs
tail -f logs/network-errors.log | grep "rate limit"

# Adjust rate limits in configuration
echo "ETHEREUM_RATE_LIMIT=5" >> .env
```

#### Connection Timeouts
```bash
# Increase timeout values
RPC_TIMEOUT=60000
WS_TIMEOUT=120000

# Use backup endpoints
ETHEREUM_RPC_BACKUP_1=https://rpc.ankr.com/eth
```

### Performance Optimization

#### Connection Pooling
```typescript
// src/services/connection/pool.ts
export class ConnectionPool {
  private pools: Map<string, Connection[]> = new Map();
  
  async getConnection(network: string): Promise<Connection> {
    const pool = this.pools.get(network) || [];
    
    if (pool.length > 0) {
      return pool.pop()!;
    }
    
    return this.createConnection(network);
  }
  
  releaseConnection(network: string, connection: Connection) {
    const pool = this.pools.get(network) || [];
    pool.push(connection);
    this.pools.set(network, pool);
  }
}
```

#### Caching Strategy
```typescript
// src/services/cache/multichain.ts
export class MultiChainCache {
  private redis: Redis;
  
  async cacheBalance(network: string, address: string, balance: any) {
    const key = `balance:${network}:${address}`;
    await this.redis.setex(key, 300, JSON.stringify(balance)); // 5-minute cache
  }
  
  async getCachedBalance(network: string, address: string) {
    const key = `balance:${network}:${address}`;
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }
}
```

## 📚 Additional Resources

- **[Network-Specific Guides](./networks/)** - Detailed setup for each network
- **[API Documentation](../api/)** - Multi-chain API endpoints
- **[Troubleshooting Guide](../getting-started/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Performance Optimization](../deployment/PERFORMANCE.md)** - Scaling multi-chain operations

---

**Last Updated**: July 17, 2025  
**Supported Networks**: 8 (4 production, 4 beta)
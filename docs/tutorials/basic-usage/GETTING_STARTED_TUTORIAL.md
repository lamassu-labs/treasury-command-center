# Getting Started Tutorial

Step-by-step tutorial for new users to get up and running with Treasury Command Center.

## 🎯 What You'll Learn

By the end of this tutorial, you'll be able to:
- Set up your Treasury Command Center account
- Add wallets from multiple blockchain networks
- Monitor your portfolio in real-time
- Set up alerts for important changes
- Generate basic reports

**Estimated Time**: 30 minutes  
**Difficulty**: Beginner  
**Prerequisites**: Basic knowledge of cryptocurrency wallets

## 📋 Before We Start

### What You'll Need
- A computer with internet access
- At least one cryptocurrency wallet address
- Basic understanding of blockchain networks
- 15-30 minutes of uninterrupted time

### Supported Networks
For this tutorial, we'll focus on these beginner-friendly networks:
- **Ethereum** - Most popular smart contract platform
- **Polygon** - Fast and low-cost Ethereum scaling solution
- **Arbitrum** - Ethereum Layer 2 for reduced fees

## 🚀 Step 1: Access Treasury Command Center

### Option A: Online Version (Recommended for Beginners)
1. Navigate to https://app.treasury-command-center.com
2. Click "Get Started" on the homepage

### Option B: Self-Hosted Version
1. Follow our [Quick Start Guide](../../getting-started/QUICK_START.md)
2. Access your local instance at http://localhost:3000

---

## 👤 Step 2: Create Your Account

### 2.1 Registration Process
1. Click "Sign Up" in the top-right corner
2. Fill out the registration form:
   ```
   Email: your-email@example.com
   Password: [Create a strong password]
   Confirm Password: [Repeat your password]
   Organization: [Optional - your company name]
   ```
3. Click "Create Account"

### 2.2 Email Verification
1. Check your email for a verification message
2. Click the verification link
3. You'll be redirected back to Treasury Command Center

### 2.3 Initial Setup
1. Log in with your new credentials
2. Complete the welcome survey (optional but helpful)
3. You'll see your empty dashboard

**🎉 Congratulations! Your account is ready.**

---

## 💰 Step 3: Add Your First Wallet

### 3.1 Navigate to Wallet Management
1. Click "Add Wallet" button on your dashboard
2. Or go to "Wallets" in the main navigation

### 3.2 Add an Ethereum Wallet
1. Select "Ethereum" from the network dropdown
2. Enter your wallet details:
   ```
   Network: Ethereum
   Address: 0x742d35Cc6634C0532925a3b8D42C81Da2b78D8d9
   Label: My Main Ethereum Wallet
   Description: Primary treasury wallet for ETH and tokens
   ```
3. Click "Add Wallet"

### 3.3 Verify Wallet Addition
- Your wallet will appear in the wallets list
- Balance data will start loading (may take 30-60 seconds)
- You'll see native ETH balance and any ERC-20 tokens

### 3.4 Add Additional Wallets (Optional)
Repeat the process for other networks:

**Polygon Wallet Example:**
```
Network: Polygon
Address: 0x742d35Cc6634C0532925a3b8D42C81Da2b78D8d9
Label: Polygon Operations Wallet
Description: Wallet for DeFi operations on Polygon
```

**Arbitrum Wallet Example:**
```
Network: Arbitrum One
Address: 0x742d35Cc6634C0532925a3b8D42C81Da2b78D8d9
Label: Arbitrum Trading Wallet
Description: Low-fee trading operations
```

---

## 📊 Step 4: Explore Your Dashboard

### 4.1 Portfolio Overview
After adding wallets, your dashboard will show:

1. **Total Portfolio Value**
   - Aggregated value across all networks
   - Updated in real-time
   
2. **Network Breakdown**
   - Value per blockchain network
   - Percentage allocation

3. **Top Holdings**
   - Your largest token positions
   - Current values and 24h changes

### 4.2 Understanding the Interface

#### Balance Cards
Each wallet shows:
- **Native Token Balance**: ETH, MATIC, etc.
- **Token Holdings**: ERC-20, SPL tokens, etc.
- **USD Values**: Real-time pricing
- **24h Changes**: Price movements

#### Quick Actions
- **Refresh**: Update balances manually
- **Export**: Download balance data
- **Settings**: Configure wallet preferences

### 4.3 Real-Time Updates
- Balances update automatically every 5 minutes
- Price data updates every 30 seconds
- New transactions appear within 1-2 minutes

---

## 🔔 Step 5: Set Up Your First Alert

Alerts help you stay informed about important changes.

### 5.1 Create a Balance Alert
1. Go to "Alerts" in the main navigation
2. Click "Create Alert"
3. Configure your alert:
   ```
   Alert Type: Balance Threshold
   Wallet: My Main Ethereum Wallet
   Condition: When balance falls below
   Threshold: 1 ETH
   Notification: Email + Dashboard
   ```
4. Click "Save Alert"

### 5.2 Create a Price Alert
1. Click "Create Alert" again
2. Set up a price-based alert:
   ```
   Alert Type: Price Change
   Token: Ethereum (ETH)
   Condition: When price changes by more than
   Threshold: 5%
   Time Period: 1 hour
   Notification: Email
   ```
3. Click "Save Alert"

### 5.3 Test Your Alerts
- Alerts will trigger based on real market conditions
- You can test by setting temporary low thresholds
- Check "Alert History" to see past notifications

---

## 📈 Step 6: Generate Your First Report

### 6.1 Basic Portfolio Report
1. Navigate to "Reports" section
2. Click "Generate Report"
3. Select "Portfolio Summary" report type
4. Choose date range: "Last 30 days"
5. Click "Generate"

### 6.2 Understanding Your Report
The report will include:
- **Portfolio Performance**: Gains/losses over time
- **Asset Allocation**: Distribution across tokens
- **Network Analysis**: Performance by blockchain
- **Transaction Summary**: Activity overview

### 6.3 Export and Share
1. Click "Export" to download as PDF or CSV
2. Use "Share" to generate a read-only link
3. Reports are saved in your account for future reference

---

## 🔧 Step 7: Customize Your Experience

### 7.1 Dashboard Preferences
1. Go to "Settings" → "Dashboard"
2. Customize:
   - Default currency (USD, EUR, etc.)
   - Refresh intervals
   - Widget layout
   - Color themes

### 7.2 Notification Settings
1. Go to "Settings" → "Notifications"
2. Configure:
   - Email frequency
   - Alert types
   - Slack/Discord integration
   - Mobile notifications (if app available)

### 7.3 Privacy Settings
1. Go to "Settings" → "Privacy"
2. Control:
   - Data sharing preferences
   - Public portfolio visibility
   - Analytics participation

---

## 🔍 Step 8: Advanced Features Preview

Now that you're set up, explore these advanced features:

### 8.1 Analytics Dashboard
- Deep dive into portfolio performance
- Compare against market indices
- Risk analysis and recommendations

### 8.2 DeFi Protocol Integration
- Track positions in Uniswap, Aave, Compound
- Monitor yield farming rewards
- DeFi portfolio analysis

### 8.3 API Access
- Generate API keys for programmatic access
- Build custom integrations
- Automate reporting workflows

---

## ✅ Tutorial Checklist

Mark off each item as you complete it:

- [ ] Created Treasury Command Center account
- [ ] Verified email address
- [ ] Added first wallet (Ethereum)
- [ ] Added second wallet (different network)
- [ ] Explored portfolio dashboard
- [ ] Set up balance alert
- [ ] Set up price alert
- [ ] Generated portfolio report
- [ ] Customized dashboard settings
- [ ] Configured notification preferences

**🎉 Congratulations! You've completed the basic setup.**

---

## 🆘 Need Help?

### Common Issues

**Problem**: Wallet not showing balances
- **Solution**: Check that the address is correct and the network is supported
- **Tip**: It can take 1-2 minutes for initial data to load

**Problem**: Alerts not triggering
- **Solution**: Verify your notification settings and email preferences
- **Tip**: Check spam folder for alert emails

**Problem**: Incorrect portfolio value
- **Solution**: Refresh the page or click "Sync Balances"
- **Tip**: Price data may have a 1-2 minute delay

### Getting Support

1. **Help Center**: Check our [FAQ](../../getting-started/FAQ.md)
2. **Community Discord**: [Join our community](https://discord.gg/treasury-command-center)
3. **Email Support**: support@treasury-command-center.com
4. **GitHub Issues**: [Report bugs](https://github.com/lamassu-labs/treasury-command-center/issues)

---

## 🚀 What's Next?

### Recommended Next Steps

1. **[Advanced Portfolio Management](../advanced/PORTFOLIO_OPTIMIZATION.md)**
   - Learn portfolio rebalancing strategies
   - Set up automated reporting
   - Configure advanced alerts

2. **[DeFi Integration Tutorial](../advanced/DEFI_INTEGRATION.md)**
   - Connect DeFi protocols
   - Track yield farming positions
   - Monitor liquidity pool performance

3. **[API Integration Guide](../../integration/api/)**
   - Generate API keys
   - Build custom dashboards
   - Automate treasury operations

4. **[Security Best Practices](../advanced/SECURITY_GUIDE.md)**
   - Secure your account
   - Enable two-factor authentication
   - Wallet security recommendations

### Join the Community

- **Discord**: [Treasury Command Center Community](https://discord.gg/treasury-command-center)
- **Twitter**: [@TreasuryCC](https://twitter.com/treasurycc)
- **GitHub**: [Contribute to the project](https://github.com/lamassu-labs/treasury-command-center)
- **Newsletter**: [Subscribe for updates](https://treasury-command-center.com/newsletter)

---

**Tutorial Complete!** 🎊

You now have a fully functional Treasury Command Center setup. Continue exploring the platform to discover more powerful features for managing your multi-chain treasury operations.

**Questions?** Join our [Discord community](https://discord.gg/treasury-command-center) where our team and community members are happy to help!

---

**Last Updated**: July 17, 2025  
**Tutorial Version**: 1.0  
**Estimated Completion Time**: 30 minutes
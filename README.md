# Treasury Command Center

<div align="center">

## 🎯 **The Only Open-Source Unified Web3 Treasury Platform**

**Replace 5+ vendor tools with one unified solution for multi-chain treasury management**

[![Status](https://img.shields.io/badge/Status-Development-yellow.svg)](https://github.com/treasury-command-center/treasury-command-center)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Documentation](https://img.shields.io/badge/Docs-Complete-green.svg)](docs/)
[![Community](https://img.shields.io/badge/Community-Active-brightgreen.svg)](CONTRIBUTING.md)

</div>

<div style="background-color: #f3f0ff; border-left: 4px solid #7C3AED; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

**🎯 Key Concept**: Enterprise-grade platform for Web3 treasury management across multiple blockchains with AI-powered automation and open-source transparency.

**Benefits**: <strong style="color: #059669;">70% operational reduction</strong> • <strong style="color: #1E40AF;">Complete portfolio visibility</strong> • <strong style="color: #7C3AED;">AI risk prevention</strong> • <strong style="color: #D97706;">Zero vendor lock-in</strong>

</div>

<div style="display: block; max-width: 100%; overflow-x: auto;">
<p><strong>Mobile-Optimized Experience</strong> - All documentation designed for 90%+ mobile experience with responsive design and touch-friendly navigation.</p>
</div>

## 🎯 **Perfect For**

<div style="background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 1rem; margin: 1rem 0;">

**🌟 Multi-Persona Platform**: Designed to serve the complete treasury management lifecycle from executive strategy to technical implementation.

</div>

### 🏢 **Enterprise DAOs & Web3 Companies**
> *"Manage $10M+ treasuries across multiple blockchains with enterprise-grade security and compliance automation"*

- **Real-time portfolio monitoring** across <strong style="color: #7C3AED;">10+ blockchain networks</strong>
- **Automated compliance reporting** for regulatory requirements
- **Risk management alerts** preventing treasury exposure

**💰 Scale**: *Perfect for organizations with <strong style="color: #059669;">$10M+ digital treasuries</strong>*

### 💼 **CFOs & Treasury Managers**  
> *"Get complete financial visibility and control over digital assets with familiar enterprise workflows"*

- **Executive dashboards** with business-friendly metrics
- **Automated reporting** replacing <strong style="color: #dc2626;">20+ hours</strong> of manual work weekly
- **Integration with traditional financial systems**

**⏰ Efficiency**: *<strong style="color: #059669;">70% reduction</strong> in operational overhead*

### 👩‍💻 **Technical Teams**
> *"Deploy production-ready treasury infrastructure in hours, not months"*

- **Kubernetes-native deployment** with full observability
- **API-first architecture** for custom integrations  
- **Professional documentation** with visual workflows

**🚀 Speed**: *<strong style="color: #7C3AED;">15-minute setup</strong> for evaluation, <strong style="color: #7C3AED;">2-week production deployment</strong>*

## 🚀 **Key Capabilities**

| **Feature** | **Enterprise Value** |
|-------------|---------------------|
| 🏢 **Enterprise Dashboard** | **Replace 5+ tools** with single platform |
| 💰 **Multi-Chain Portfolio** | **Complete visibility** of distributed treasury |
| 🤖 **AI Agent Automation** | **Prevent costly mistakes** and compliance failures |
| 📊 **Intelligence Analytics** | **Data-driven decisions** with actionable intelligence |

> **💡 Learn More**: [Complete feature breakdown](docs/business/BUSINESS_VALUE_OVERVIEW.md) with ROI analysis and competitive advantages.

## 🚀 **Choose Your Journey**

<div align="center">

### **Which best describes you?**

</div>

<table>
<tr>
<td width="25%" align="center">
<h3>💼 <strong>Business Leader</strong></h3>
<p><em>CFO, VP Finance, Executive</em></p>
<p>Evaluate business value and ROI</p>
<br/>
<a href="docs/business/BUSINESS_VALUE_OVERVIEW.md"><strong>📊 View Business Case</strong></a><br/>
<small><em>3-minute read</em></small>
</td>
<td width="25%" align="center">
<h3>🔧 <strong>Technical Evaluator</strong></h3>
<p><em>CTO, Engineering Manager, Architect</em></p>
<p>Assess technical fit and integration</p>
<br/>
<a href="docs/technical/TECHNICAL_EVALUATION.md"><strong>🏗️ Technical Overview</strong></a><br/>
<small><em>5-minute assessment</em></small>
</td>
<td width="25%" align="center">
<h3>👩‍💻 <strong>Developer</strong></h3>
<p><em>Engineer, DevOps, Implementation</em></p>
<p>Get hands-on with setup and integration</p>
<br/>
<a href="#-developer-quick-start"><strong>⚡ Quick Start Guide</strong></a><br/>
<small><em>15-minute setup</em></small>
</td>
<td width="25%" align="center">
<h3>🤝 <strong>Contributor</strong></h3>
<p><em>Open Source Enthusiast, Community</em></p>
<p>Join the community and contribute</p>
<br/>
<a href="docs/community/CONTRIBUTION_OVERVIEW.md"><strong>🌟 Get Involved</strong></a><br/>
<small><em>5-minute onboarding</em></small>
</td>
</tr>
</table>

---

## ⚡ **Developer Quick Start**

> **🎯 Goal**: Running Treasury Command Center locally in 15 minutes

### **Prerequisites**
```bash
✅ Node.js 18+ (recommend v20 LTS)
✅ Python 3.11+ 
✅ PostgreSQL 15+
✅ Redis 6+
✅ Git 2.30+
```

### **Step 1: Clone & Setup (2 minutes)**
```bash
# Clone the repository
git clone https://github.com/treasury-command-center/treasury-command-center.git
cd treasury-command-center

# Install dependencies
npm install && pip install -r requirements.txt
```

### **Step 2: Configuration (5 minutes)**
```bash
# Copy environment template
cp env.template .env

# Edit configuration (essential settings)
nano .env
```

**Required Environment Variables**:
```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/treasury_dev
REDIS_URL=redis://localhost:6379/0

# Development
NODE_ENV=development
API_PORT=8000
FRONTEND_PORT=3000
```

### **Step 3: Database Setup (3 minutes)**
```bash
# Start services
sudo systemctl start postgresql redis

# Create development database
createdb treasury_dev

# Run migrations
cd src/backend && python -c "from database import create_tables; create_tables()"
```

### **Step 4: Launch (2 minutes)**
```bash
# Start backend (Terminal 1)
cd src/backend && python main.py

# Start frontend (Terminal 2)  
cd src/frontend && npm run dev
```

### **Step 5: Verify Setup (3 minutes)**
1. **Frontend**: Visit [http://localhost:3000](http://localhost:3000)
2. **API**: Check [http://localhost:8000/health](http://localhost:8000/health)
3. **Documentation**: Browse [http://localhost:8000/docs](http://localhost:8000/docs)

### **🎉 Success!** 
You now have Treasury Command Center running locally. 

**🎯 Next Steps:**
- 📖 **[Follow Tutorial](docs/tutorials/basic-usage/GETTING_STARTED_TUTORIAL.md)** - *Add your first wallet and explore features* (15 min)
- 🔧 **[Development Setup](docs/developers/DEVELOPMENT_SETUP.md)** - *Complete development environment with testing* (30 min)  
- 🏗️ **[Architecture Overview](docs/technical/ARCHITECTURE_OVERVIEW.md)** - *Deep dive into system design and components* (15 min)

**🔍 Explore More:**
- 🚀 **[Production Deployment](docs/deployment/PRODUCTION_DEPLOYMENT.md)** - *Enterprise-grade deployment guide*
- 🔗 **[Multi-Chain Setup](docs/integration/blockchain/MULTI_CHAIN_SETUP.md)** - *Configure 10+ blockchain networks*
- 📚 **[Complete Documentation](docs/)** - *All guides, references, and resources*

## 📚 **Learn More**

| **Topic** | **Resource** | **Time** |
|-----------|-------------|----------|
| **📊 Business Value** | [Business Overview](docs/business/BUSINESS_VALUE_OVERVIEW.md) | 3 min |
| **🏗️ Architecture** | [Technical Evaluation](docs/technical/TECHNICAL_EVALUATION.md) | 5 min |
| **🤝 Contributing** | [Community Overview](docs/community/CONTRIBUTION_OVERVIEW.md) | 5 min |
| **📖 Complete Docs** | [Documentation Hub](docs/README.md) | Browse |

## 🤝 **Contributing**

We welcome contributions! Join our community of developers, treasury managers, and Web3 enthusiasts building the future of digital treasury management.

**Quick Start**: [Community Overview](docs/community/CONTRIBUTION_OVERVIEW.md) | **Development**: [Development Setup](docs/developers/DEVELOPMENT_SETUP.md)

## 📜 **License**

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the Treasury Command Center community**

*Open-source unified Web3 treasury management platform*
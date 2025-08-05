#!/bin/bash

# Add frontmatter to key documentation files for Docusaurus build

echo "🔧 Adding frontmatter to documentation files..."

# Business files
sed -i '' '1i\
---\
id: detailed-business-case\
title: Detailed Business Case\
sidebar_label: Detailed Business Case\
sidebar_position: 2\
---\
' docs/business/DETAILED_BUSINESS_CASE.md

sed -i '' '1i\
---\
id: market-opportunity\
title: Market Opportunity\
sidebar_label: Market Opportunity\
sidebar_position: 3\
---\
' docs/business/MARKET_OPPORTUNITY.md

# Technical files
sed -i '' '1i\
---\
id: technical-evaluation\
title: Technical Evaluation\
sidebar_label: Technical Evaluation\
sidebar_position: 1\
---\
' docs/technical/TECHNICAL_EVALUATION.md

sed -i '' '1i\
---\
id: technical-deep-dive\
title: Technical Deep Dive\
sidebar_label: Technical Deep Dive\
sidebar_position: 2\
---\
' docs/technical/TECHNICAL_DEEP_DIVE.md

sed -i '' '1i\
---\
id: architecture-overview\
title: Architecture Overview\
sidebar_label: Architecture Overview\
sidebar_position: 3\
---\
' docs/technical/ARCHITECTURE_OVERVIEW.md

# Community files
sed -i '' '1i\
---\
id: contribution-overview\
title: Contribution Overview\
sidebar_label: Contribution Overview\
sidebar_position: 1\
---\
' docs/community/CONTRIBUTION_OVERVIEW.md

sed -i '' '1i\
---\
id: advanced-contribution\
title: Advanced Contribution\
sidebar_label: Advanced Contribution\
sidebar_position: 2\
---\
' docs/community/ADVANCED_CONTRIBUTION.md

sed -i '' '1i\
---\
id: first-contribution\
title: First Contribution\
sidebar_label: First Contribution\
sidebar_position: 3\
---\
' docs/community/FIRST_CONTRIBUTION.md

# Getting Started files
sed -i '' '1i\
---\
id: quick-start\
title: Quick Start Guide\
sidebar_label: Quick Start\
sidebar_position: 1\
---\
' docs/getting-started/QUICK_START.md

# Developer files
sed -i '' '1i\
---\
id: development-setup\
title: Development Setup\
sidebar_label: Development Setup\
sidebar_position: 1\
---\
' docs/developers/DEVELOPMENT_SETUP.md

# Deployment files
sed -i '' '1i\
---\
id: production-deployment\
title: Production Deployment\
sidebar_label: Production Deployment\
sidebar_position: 1\
---\
' docs/deployment/PRODUCTION_DEPLOYMENT.md

# API files
sed -i '' '1i\
---\
id: api-reference\
title: API Reference\
sidebar_label: API Reference\
sidebar_position: 1\
---\
' docs/api/README.md

# Product files
sed -i '' '1i\
---\
id: treasury-command-center-prd\
title: Product Requirements Document\
sidebar_label: Product Requirements\
sidebar_position: 1\
---\
' docs/product/TREASURY_COMMAND_CENTER_PRD.md

# Integration files
sed -i '' '1i\
---\
id: multi-chain-setup\
title: Multi-Chain Setup\
sidebar_label: Multi-Chain Setup\
sidebar_position: 1\
---\
' docs/integration/blockchain/MULTI_CHAIN_SETUP.md

# Tutorial files
sed -i '' '1i\
---\
id: getting-started-tutorial\
title: Getting Started Tutorial\
sidebar_label: Getting Started Tutorial\
sidebar_position: 1\
---\
' docs/tutorials/basic-usage/GETTING_STARTED_TUTORIAL.md

echo "✅ Frontmatter added to all documentation files"
echo "📋 Ready for Docusaurus build"
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Treasury Command Center Progressive Disclosure Documentation Structure
  documentationSidebar: [
    {
      type: 'html',
      value: '<div class="sidebar-header">📚 Treasury Command Center</div>',
    },
    {
      type: 'doc',
      id: 'intro',
      label: '🏠 Documentation Hub',
      className: 'layer-badge--layer2',
    },
    {
      type: 'category',
      label: '🚀 Layer 1: Quick Overview',
      className: 'layer-badge--layer1',
      items: [
        {
          type: 'link',
          label: 'Main README',
          href: '/README.md',
        },
      ],
    },
    {
      type: 'category',
      label: '📋 Layer 2: Summaries (3-5 min)',
      className: 'layer-badge--layer2',
      items: [
        {
          type: 'doc',
          id: 'business/business-value-overview',
          label: '💼 Business Value Overview',
        },
        {
          type: 'doc',
          id: 'technical/technical-evaluation',
          label: '🔧 Technical Evaluation',
        },
        {
          type: 'doc',
          id: 'community/contribution-overview',
          label: '🤝 Community Overview',
        },
      ],
    },
    {
      type: 'category',
      label: '🔍 Layer 3: Deep Dive (8-10 min)',
      className: 'layer-badge--layer3',
      items: [
        {
          type: 'doc',
          id: 'business/detailed-business-case',
          label: '💰 Detailed Business Case',
        },
        {
          type: 'doc',
          id: 'technical/technical-deep-dive',
          label: '🏗️ Technical Deep Dive',
        },
        {
          type: 'doc',
          id: 'community/advanced-contribution',
          label: '👥 Advanced Contribution',
        },
        {
          type: 'doc',
          id: 'README',
          label: '🗂️ Complete Documentation Index',
        },
      ],
    },
    {
      type: 'category',
      label: '⚡ Layer 4: Implementation (15-45 min)',
      className: 'layer-badge--layer4',
      items: [
        {
          type: 'doc',
          id: 'getting-started/quick-start',
          label: '🚀 Quick Start Guide',
        },
        {
          type: 'doc',
          id: 'developers/development-setup',
          label: '👩‍💻 Development Setup',
        },
        {
          type: 'doc',
          id: 'deployment/production-deployment',
          label: '🏭 Production Deployment',
        },
        {
          type: 'doc',
          id: 'community/first-contribution',
          label: '🎯 First Contribution',
        },
      ],
    },
    {
      type: 'category',
      label: '📚 Reference Documentation',
      items: [
        {
          type: 'doc',
          id: 'api/api-reference',
          label: '🔌 API Reference',
        },
        {
          type: 'doc',
          id: 'technical/architecture-overview',
          label: '🏛️ Architecture Overview',
        },
        {
          type: 'doc',
          id: 'integration/blockchain/multi-chain-setup',
          label: '🔗 Multi-Chain Setup',
        },
        {
          type: 'doc',
          id: 'product/treasury-command-center-prd',
          label: '📋 Product Requirements',
        },
      ],
    },
    {
      type: 'category',
      label: '🎓 Tutorials & Guides',
      items: [
        {
          type: 'doc',
          id: 'tutorials/basic-usage/getting-started-tutorial',
          label: '📖 Getting Started Tutorial',
        },
        {
          type: 'doc',
          id: 'business/market-opportunity',
          label: '📊 Market Opportunity',
        },
      ],
    },
  ],
};

export default sidebars;

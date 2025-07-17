import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Minimal sidebar configuration for Treasury Command Center Documentation
 * Testing progressive disclosure structure with core documents only
 */
const sidebars: SidebarsConfig = {
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
      label: '📋 Layer 2: Quick Summaries',
      className: 'layer-badge--layer2',
      items: [
        'business/business-value-overview',
        'technical/technical-evaluation',
        'community/contribution-overview',
      ],
    },
    {
      type: 'category',
      label: '🔍 Layer 3: Deep Dive',
      className: 'layer-badge--layer3',
      items: [
        'business/detailed-business-case',
        'technical/technical-deep-dive',
        'community/advanced-contribution',
      ],
    },
    {
      type: 'category',
      label: '⚡ Layer 4: Implementation',
      className: 'layer-badge--layer4',
      items: [
        'getting-started/quick-start',
        'developers/development-setup',
        'deployment/production-deployment',
      ],
    },
  ],
};

export default sidebars;
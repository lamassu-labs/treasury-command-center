import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Treasury Command Center',
  tagline: 'The Only Open-Source Unified Web3 Treasury Platform',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://nuru.network',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/treasury-monitoring/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lamassu-labs', // Usually your GitHub org/user name.
  projectName: 'treasury-command-center', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/lamassu-labs/treasury-command-center/tree/main/docs/',
          exclude: [
            '**/ANALYTICS_IMPLEMENTATION_GUIDE.md',
            '**/ANALYTICS_MEASUREMENT_FRAMEWORK.md',
            '**/CONTENT_AUDIT_WEEK2.md',
            '**/CONTENT_MIGRATION_AUDIT.md',
            '**/DIAGRAM_STYLE_GUIDE.md',
            '**/DOCUMENTATION_ARCHITECTURE_ANALYSIS.md',
            '**/DOCUMENTATION_STANDARDS.md',
            '**/LAYER1_PROGRESSIVE_DISCLOSURE_COMPLIANCE.md',
            '**/LAYER2_PROGRESSIVE_DISCLOSURE_COMPLIANCE.md',
            '**/MERMAID_ENHANCEMENT_PLAN.md',
            '**/MERMAID_SPRINT_COMPLETION_REPORT.md',
            '**/PERFORMANCE_ACCESSIBILITY_COMPLIANCE.md',
            '**/SPRINT_MERMAID_DOCUMENTATION_ENHANCEMENT.md',
            '**/SPRINT_PROGRESSIVE_DISCLOSURE_DOCUMENTATION.md',
            '**/USER_JOURNEY_VALIDATION.md',
            '**/interactive/**',
          ],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Treasury Command Center',
      logo: {
        alt: 'Treasury Command Center Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'documentationSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'dropdown',
          label: 'Quick Start',
          position: 'left',
          items: [
            {
              label: 'Business Value (3 min)',
              to: '/docs/business/business-value-overview',
            },
            {
              label: 'Technical Evaluation (5 min)',
              to: '/docs/technical/technical-evaluation',
            },
            {
              label: 'Setup Guide (15 min)',
              to: '/docs/getting-started/quick-start',
            },
          ],
        },
        {
          href: 'https://github.com/lamassu-labs/treasury-command-center',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Business Value Overview',
              to: '/docs/business/business-value-overview',
            },
            {
              label: 'Technical Evaluation',
              to: '/docs/technical/technical-evaluation',
            },
            {
              label: 'Quick Start Guide',
              to: '/docs/getting-started/quick-start',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contributing Guide',
              to: '/docs/community/contribution-overview',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/lamassu-labs/treasury-command-center/discussions',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/treasury-command-center',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/lamassu-labs/treasury-command-center',
            },
            {
              label: 'API Reference',
              to: '/docs/api',
            },
            {
              label: 'Architecture Overview',
              to: '/docs/technical/architecture-overview',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Treasury Command Center. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

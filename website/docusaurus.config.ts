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
        docs: false,
        blog: false,
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
          type: 'dropdown',
          label: 'Quick Access',
          position: 'left',
          items: [
            {
              label: 'Business Value (3 min)',
              href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/business/BUSINESS_VALUE_OVERVIEW.md',
            },
            {
              label: 'Technical Evaluation (5 min)',
              href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/technical/TECHNICAL_EVALUATION.md',
            },
            {
              label: 'Quick Start Guide (15 min)',
              href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/getting-started/QUICK_START.md',
            },
          ],
        },
        {
          href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/README.md',
          label: 'Full Documentation',
          position: 'left',
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
              href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/business/BUSINESS_VALUE_OVERVIEW.md',
            },
            {
              label: 'Technical Evaluation',
              href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/technical/TECHNICAL_EVALUATION.md',
            },
            {
              label: 'Quick Start Guide',
              href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/getting-started/QUICK_START.md',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contributing Guide',
              href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/community/CONTRIBUTION_OVERVIEW.md',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/lamassu-labs/treasury-command-center',
            },
            {
              label: 'GitHub Issues',
              href: 'https://github.com/lamassu-labs/treasury-command-center/issues',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Full Documentation',
              href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/README.md',
            },
            {
              label: 'Architecture Overview',
              href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/technical/ARCHITECTURE_OVERVIEW.md',
            },
            {
              label: 'Production Deployment',
              href: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/deployment/PRODUCTION_DEPLOYMENT.md',
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

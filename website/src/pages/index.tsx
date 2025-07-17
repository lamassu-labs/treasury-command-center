import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import PersonaSelector from '@site/src/components/PersonaSelector';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            📚 Start with Documentation Hub
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/business/BUSINESS_VALUE_OVERVIEW">
            💼 Business Value (3 min)
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/getting-started/QUICK_START">
            🚀 Quick Start (15 min)
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Web3 Treasury Management Platform`}
      description="Enterprise-grade open-source platform for Web3 treasury management across multiple blockchains with AI-powered automation">
      <HomepageHeader />
      <main>
        <PersonaSelector />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

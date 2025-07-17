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
            href="https://github.com/lamassu-labs/treasury-command-center">
            🚀 View on GitHub
          </Link>
          <Link
            className="button button--outline button--lg"
            href="#documentation"
            style={{marginLeft: '1rem'}}>
            📚 Explore Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

function DocumentationSection() {
  return (
    <section id="documentation" className="container margin-vert--lg">
      <div className="row">
        <div className="col col--12">
          <Heading as="h2" className="text--center margin-bottom--lg">
            🎯 Choose Your Documentation Journey
          </Heading>
          <PersonaSelector />
        </div>
      </div>
    </section>
  );
}

function QuickAccessSection() {
  return (
    <section className="container margin-vert--lg">
      <div className="row">
        <div className="col col--12">
          <Heading as="h2" className="text--center margin-bottom--lg">
            ⚡ Progressive Disclosure Framework
          </Heading>
        </div>
      </div>
      <div className="row">
        <div className="col col--4">
          <div className="card margin-bottom--md">
            <div className="card__header">
              <h3>🎯 Layer 1: Awareness</h3>
              <div className="badge badge--success">2-3 minutes</div>
            </div>
            <div className="card__body">
              <p>Quick overview for decision makers and stakeholders</p>
              <ul>
                <li>Business value proposition</li>
                <li>Key differentiators</li>
                <li>ROI summary</li>
              </ul>
            </div>
            <div className="card__footer">
              <Link 
                href="https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/business/BUSINESS_VALUE_OVERVIEW.md" 
                className="button button--primary button--block">
                💼 Business Value Overview
              </Link>
            </div>
          </div>
        </div>
        <div className="col col--4">
          <div className="card margin-bottom--md">
            <div className="card__header">
              <h3>📊 Layer 2: Interest</h3>
              <div className="badge badge--warning">5-8 minutes</div>
            </div>
            <div className="card__body">
              <p>Detailed evaluation for technical stakeholders</p>
              <ul>
                <li>Technical architecture</li>
                <li>Integration requirements</li>
                <li>Security analysis</li>
              </ul>
            </div>
            <div className="card__footer">
              <Link 
                href="https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/technical/TECHNICAL_EVALUATION.md" 
                className="button button--primary button--block">
                🔬 Technical Evaluation
              </Link>
            </div>
          </div>
        </div>
        <div className="col col--4">
          <div className="card margin-bottom--md">
            <div className="card__header">
              <h3>⚡ Layer 3: Implementation</h3>
              <div className="badge badge--danger">15-30 minutes</div>
            </div>
            <div className="card__body">
              <p>Step-by-step setup and deployment guide</p>
              <ul>
                <li>Installation instructions</li>
                <li>Configuration setup</li>
                <li>Deployment procedures</li>
              </ul>
            </div>
            <div className="card__footer">
              <Link 
                href="https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/getting-started/QUICK_START.md" 
                className="button button--primary button--block">
                🚀 Quick Start Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformStatusSection() {
  return (
    <section className="container margin-vert--lg" style={{backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px'}}>
      <div className="row">
        <div className="col col--12">
          <Heading as="h2" className="text--center margin-bottom--lg">
            🏗️ Platform Status & Features
          </Heading>
        </div>
      </div>
      <div className="row">
        <div className="col col--6">
          <div className="margin-bottom--md">
            <h4>✅ Live Documentation Platform</h4>
            <p>Professional Docusaurus platform with Treasury Command Center branding and progressive disclosure navigation</p>
          </div>
          <div className="margin-bottom--md">
            <h4>✅ Role-Based Navigation</h4>
            <p>PersonaSelector component providing customized documentation journeys for different user types</p>
          </div>
          <div className="margin-bottom--md">
            <h4>✅ Enterprise Infrastructure</h4>
            <p>Production deployment ready with automated workflows and GitHub Actions integration</p>
          </div>
        </div>
        <div className="col col--6">
          <div className="margin-bottom--md">
            <h4>✅ GitHub Integration</h4>
            <p>Dual-source documentation with live synchronization and edit links to repository</p>
          </div>
          <div className="margin-bottom--md">
            <h4>✅ Progressive Disclosure Framework</h4>
            <p>4-layer structure optimized for information consumption with time estimates and accessibility compliance</p>
          </div>
          <div className="margin-bottom--md">
            <h4>🚀 Series A Ready</h4>
            <p>Complete documentation framework demonstrating operational excellence and technical sophistication</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Enterprise Web3 Treasury Platform`}
      description="The only open-source unified Web3 treasury platform with AI-powered automation and enterprise-grade infrastructure">
      <HomepageHeader />
      <main>
        <DocumentationSection />
        <QuickAccessSection />
        <PlatformStatusSection />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

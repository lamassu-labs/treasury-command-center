import React, { useState } from 'react';
import styles from './styles.module.css';

interface PersonaPath {
  title: string;
  description: string;
  timeEstimate: string;
  color: string;
  steps: Array<{
    title: string;
    description: string;
    link: string;
    time: string;
  }>;
}

const personaPaths: Record<string, PersonaPath> = {
  business: {
    title: '💼 Business Leader',
    description: 'Executive, CFO, Decision Maker',
    timeEstimate: '10-15 minutes',
    color: 'var(--tcc-green)',
    steps: [
      {
        title: 'Business Value Overview',
        description: 'Understand ROI, competitive advantages, and strategic positioning',
        link: '/docs/business/BUSINESS_VALUE_OVERVIEW',
        time: '3 min',
      },
      {
        title: 'Market Opportunity',
        description: 'Review market positioning and competitive landscape',
        link: '/docs/business/MARKET_OPPORTUNITY',
        time: '5 min',
      },
      {
        title: 'Detailed Business Case',
        description: 'Complete financial impact analysis and implementation strategy',
        link: '/docs/business/DETAILED_BUSINESS_CASE',
        time: '8 min',
      },
    ],
  },
  technical: {
    title: '🔧 Technical Evaluator',
    description: 'Architect, Developer, IT Leader',
    timeEstimate: '15-20 minutes',
    color: 'var(--tcc-blue)',
    steps: [
      {
        title: 'Technical Evaluation',
        description: 'Review architecture, technology stack, and integration requirements',
        link: '/docs/technical/TECHNICAL_EVALUATION',
        time: '5 min',
      },
      {
        title: 'Architecture Deep Dive',
        description: 'Comprehensive system design and deployment strategies',
        link: '/docs/technical/TECHNICAL_DEEP_DIVE',
        time: '10 min',
      },
      {
        title: 'Quick Start Validation',
        description: 'Local deployment and functionality testing',
        link: '/docs/getting-started/QUICK_START',
        time: '15 min',
      },
    ],
  },
  community: {
    title: '🤝 Community Member',
    description: 'Contributor, Open Source Enthusiast',
    timeEstimate: '20-30 minutes',
    color: 'var(--tcc-orange)',
    steps: [
      {
        title: 'Community Overview',
        description: 'Discover contribution opportunities and community benefits',
        link: '/docs/community/CONTRIBUTION_OVERVIEW',
        time: '5 min',
      },
      {
        title: 'First Contribution',
        description: '30-minute onboarding with multiple contribution pathways',
        link: '/docs/community/FIRST_CONTRIBUTION',
        time: '30 min',
      },
      {
        title: 'Development Setup',
        description: 'Complete development environment for code contributions',
        link: '/docs/developers/DEVELOPMENT_SETUP',
        time: '30 min',
      },
    ],
  },
  implementer: {
    title: '👩‍💻 Implementation Team',
    description: 'DevOps, Developer, System Admin',
    timeEstimate: '30-60 minutes',
    color: 'var(--tcc-purple)',
    steps: [
      {
        title: 'Quick Start Deployment',
        description: '15-minute local setup with prerequisites and commands',
        link: '/docs/getting-started/QUICK_START',
        time: '15 min',
      },
      {
        title: 'Development Environment',
        description: 'Complete development setup with testing and debugging tools',
        link: '/docs/developers/DEVELOPMENT_SETUP',
        time: '30 min',
      },
      {
        title: 'Production Deployment',
        description: 'Enterprise deployment with monitoring and security',
        link: '/docs/deployment/PRODUCTION_DEPLOYMENT',
        time: '45 min',
      },
    ],
  },
};

export default function PersonaSelector(): JSX.Element {
  const [selectedPersona, setSelectedPersona] = useState<string>('business');
  const currentPath = personaPaths[selectedPersona];

  return (
    <div className={styles.personaSelector}>
      <div className={styles.header}>
        <h2>👥 Choose Your Role-Based Journey</h2>
        <p>Get personalized documentation paths optimized for your responsibilities</p>
      </div>
      
      <div className={styles.personaGrid}>
        {Object.entries(personaPaths).map(([key, persona]) => (
          <div
            key={key}
            className={`${styles.personaCard} ${selectedPersona === key ? styles.active : ''}`}
            onClick={() => setSelectedPersona(key)}
            style={{ borderColor: selectedPersona === key ? persona.color : undefined }}
          >
            <h3>{persona.title}</h3>
            <p>{persona.description}</p>
            <div className={styles.timeEstimate}>⏱️ {persona.timeEstimate}</div>
          </div>
        ))}
      </div>

      <div className={styles.journeyPath}>
        <div className={styles.pathHeader}>
          <h3 style={{ color: currentPath.color }}>{currentPath.title} Journey</h3>
          <p>Estimated time: <strong>{currentPath.timeEstimate}</strong></p>
        </div>
        
        <div className={styles.stepsContainer}>
          {currentPath.steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepNumber} style={{ backgroundColor: currentPath.color }}>
                {index + 1}
              </div>
              <div className={styles.stepContent}>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                <div className={styles.stepMeta}>
                  <span className={styles.timeTag}>📖 {step.time}</span>
                  <a href={step.link} className={styles.stepLink} style={{ backgroundColor: currentPath.color }}>
                    Start Reading →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
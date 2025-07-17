import React, { useState, useEffect, useMemo } from 'react';
import { useAnalytics } from '../Analytics/PrivacyFirstAnalytics';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: 'business' | 'technical' | 'community' | 'implementation';
  layer: number;
  timeEstimate: string;
  keywords: string[];
  relevanceScore: number;
}

// Comprehensive documentation index for semantic search
const documentationIndex: Omit<SearchResult, 'relevanceScore'>[] = [
  // Layer 1 - Awareness
  {
    title: 'Business Value Overview',
    description: 'ROI analysis, competitive advantages, and strategic positioning for treasury management',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/business/BUSINESS_VALUE_OVERVIEW.md',
    type: 'business',
    layer: 1,
    timeEstimate: '3 min',
    keywords: ['business', 'value', 'roi', 'competitive', 'advantages', 'treasury', 'management', 'strategic', 'positioning', 'enterprise', 'cost', 'savings', 'efficiency'],
  },
  {
    title: 'Technical Evaluation',
    description: 'Architecture overview, technology stack, and integration requirements',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/technical/TECHNICAL_EVALUATION.md',
    type: 'technical',
    layer: 1,
    timeEstimate: '5 min',
    keywords: ['technical', 'architecture', 'technology', 'stack', 'integration', 'requirements', 'evaluation', 'system', 'design', 'infrastructure', 'scalability', 'security'],
  },
  {
    title: 'Community Contribution Overview',
    description: 'Discover contribution opportunities and community benefits',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/community/CONTRIBUTION_OVERVIEW.md',
    type: 'community',
    layer: 1,
    timeEstimate: '5 min',
    keywords: ['community', 'contribution', 'open', 'source', 'collaboration', 'benefits', 'opportunities', 'volunteer', 'participate', 'github', 'development'],
  },

  // Layer 2 - Interest
  {
    title: 'Detailed Business Case',
    description: 'Complete financial impact analysis and implementation strategy',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/business/DETAILED_BUSINESS_CASE.md',
    type: 'business',
    layer: 2,
    timeEstimate: '8 min',
    keywords: ['detailed', 'business', 'case', 'financial', 'impact', 'analysis', 'implementation', 'strategy', 'cost', 'benefit', 'investment', 'planning'],
  },
  {
    title: 'Technical Deep Dive',
    description: 'Comprehensive system design and deployment strategies',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/technical/TECHNICAL_DEEP_DIVE.md',
    type: 'technical',
    layer: 2,
    timeEstimate: '10 min',
    keywords: ['technical', 'deep', 'dive', 'system', 'design', 'deployment', 'strategies', 'architecture', 'detailed', 'comprehensive', 'engineering'],
  },
  {
    title: 'Advanced Contribution Guide',
    description: 'Comprehensive governance structure and leadership pathways',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/community/ADVANCED_CONTRIBUTION.md',
    type: 'community',
    layer: 2,
    timeEstimate: '12 min',
    keywords: ['advanced', 'contribution', 'governance', 'structure', 'leadership', 'pathways', 'maintainer', 'review', 'process', 'guidelines'],
  },
  {
    title: 'Market Opportunity Analysis',
    description: 'Market positioning and competitive landscape review',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/business/MARKET_OPPORTUNITY.md',
    type: 'business',
    layer: 2,
    timeEstimate: '7 min',
    keywords: ['market', 'opportunity', 'analysis', 'positioning', 'competitive', 'landscape', 'review', 'industry', 'trends', 'web3', 'defi'],
  },

  // Layer 3 - Implementation
  {
    title: 'Quick Start Guide',
    description: '15-minute local setup with prerequisites and commands',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/getting-started/QUICK_START.md',
    type: 'implementation',
    layer: 3,
    timeEstimate: '15 min',
    keywords: ['quick', 'start', 'guide', 'setup', 'prerequisites', 'commands', 'installation', 'local', 'development', 'getting', 'started'],
  },
  {
    title: 'Development Environment Setup',
    description: 'Complete development setup with testing and debugging tools',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/developers/DEVELOPMENT_SETUP.md',
    type: 'implementation',
    layer: 3,
    timeEstimate: '30 min',
    keywords: ['development', 'environment', 'setup', 'testing', 'debugging', 'tools', 'local', 'configuration', 'developer', 'workflow'],
  },
  {
    title: 'Production Deployment',
    description: 'Enterprise deployment with monitoring and security',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/deployment/PRODUCTION_DEPLOYMENT.md',
    type: 'implementation',
    layer: 3,
    timeEstimate: '45 min',
    keywords: ['production', 'deployment', 'enterprise', 'monitoring', 'security', 'scaling', 'infrastructure', 'operational', 'maintenance'],
  },
  {
    title: 'Architecture Overview',
    description: 'System architecture and component relationships',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/technical/ARCHITECTURE_OVERVIEW.md',
    type: 'technical',
    layer: 3,
    timeEstimate: '20 min',
    keywords: ['architecture', 'overview', 'system', 'component', 'relationships', 'design', 'patterns', 'structure', 'microservices', 'api'],
  },
  {
    title: 'Multi-Chain Setup',
    description: 'Configure multi-blockchain treasury management',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/integration/blockchain/MULTI_CHAIN_SETUP.md',
    type: 'implementation',
    layer: 3,
    timeEstimate: '25 min',
    keywords: ['multi', 'chain', 'setup', 'blockchain', 'treasury', 'management', 'configuration', 'ethereum', 'polygon', 'arbitrum', 'integration'],
  },
  {
    title: 'First Contribution',
    description: '30-minute onboarding with multiple contribution pathways',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/community/FIRST_CONTRIBUTION.md',
    type: 'community',
    layer: 3,
    timeEstimate: '30 min',
    keywords: ['first', 'contribution', 'onboarding', 'pathways', 'beginner', 'guide', 'pull', 'request', 'issue', 'documentation', 'code'],
  },

  // Layer 4 - Mastery
  {
    title: 'Treasury Command Center PRD',
    description: 'Complete product requirements and feature specifications',
    url: 'https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/product/TREASURY_COMMAND_CENTER_PRD.md',
    type: 'business',
    layer: 4,
    timeEstimate: '20 min',
    keywords: ['prd', 'product', 'requirements', 'feature', 'specifications', 'roadmap', 'planning', 'vision', 'strategy', 'goals'],
  },
];

// Simple semantic search algorithm
const calculateRelevanceScore = (item: Omit<SearchResult, 'relevanceScore'>, query: string): number => {
  const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  let score = 0;

  queryTerms.forEach(term => {
    // Title match (highest weight)
    if (item.title.toLowerCase().includes(term)) {
      score += 10;
    }
    
    // Description match (medium weight)
    if (item.description.toLowerCase().includes(term)) {
      score += 5;
    }
    
    // Keywords match (medium-high weight)
    item.keywords.forEach(keyword => {
      if (keyword.includes(term) || term.includes(keyword)) {
        score += 7;
      }
    });
    
    // Type and layer context bonus
    if (item.type.includes(term)) {
      score += 3;
    }
  });

  // Boost for Layer 1 content (better for beginners)
  if (item.layer === 1) {
    score += 2;
  }

  return score;
};

interface SemanticSearchProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SemanticSearch: React.FC<SemanticSearchProps> = ({ isVisible, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLayer, setSelectedLayer] = useState<number | string>('all');
  const { trackLayerNavigation } = useAnalytics();

  const searchResults = useMemo(() => {
    if (!query || query.length < 2) return [];

    let results = documentationIndex.map(item => ({
      ...item,
      relevanceScore: calculateRelevanceScore(item, query),
    }));

    // Filter by type
    if (selectedType !== 'all') {
      results = results.filter(item => item.type === selectedType);
    }

    // Filter by layer
    if (selectedLayer !== 'all') {
      results = results.filter(item => item.layer === selectedLayer);
    }

    // Sort by relevance and return top 10
    return results
      .filter(item => item.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10);
  }, [query, selectedType, selectedLayer]);

  const handleResultClick = (result: SearchResult) => {
    trackLayerNavigation(`Layer-${result.layer}`, result.url);
    window.open(result.url, '_blank');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'business': return '💼';
      case 'technical': return '🔧';
      case 'community': return '🤝';
      case 'implementation': return '👩‍💻';
      default: return '📄';
    }
  };

  const getLayerBadge = (layer: number) => {
    const colors = {
      1: '#059669', // green
      2: '#d97706', // orange
      3: '#dc2626', // red
      4: '#7C3AED', // purple
    };
    
    return (
      <span style={{
        backgroundColor: colors[layer] || '#6B7280',
        color: 'white',
        padding: '2px 6px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
      }}>
        L{layer}
      </span>
    );
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '10vh',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '800px',
        maxHeight: '80vh',
        overflow: 'auto',
        width: '90%',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>🔍 Smart Documentation Search</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
            ✕
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search documentation... (e.g., 'setup development', 'business value', 'deployment guide')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #E5E7EB',
              borderRadius: '6px',
              fontSize: '1rem',
              outline: 'none',
            }}
            onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 'bold', marginRight: '0.5rem' }}>Type:</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="all">All Types</option>
              <option value="business">💼 Business</option>
              <option value="technical">🔧 Technical</option>
              <option value="community">🤝 Community</option>
              <option value="implementation">👩‍💻 Implementation</option>
            </select>
          </div>
          
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 'bold', marginRight: '0.5rem' }}>Layer:</label>
            <select 
              value={selectedLayer} 
              onChange={(e) => setSelectedLayer(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="all">All Layers</option>
              <option value="1">Layer 1 - Awareness</option>
              <option value="2">Layer 2 - Interest</option>
              <option value="3">Layer 3 - Implementation</option>
              <option value="4">Layer 4 - Mastery</option>
            </select>
          </div>
        </div>

        {query.length < 2 && (
          <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            <p>💡 Try searching for:</p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              {['business value', 'quick start', 'development setup', 'architecture', 'deployment', 'community'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#F3F0FF',
                    color: '#7C3AED',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {query.length >= 2 && searchResults.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            <p>No results found for "{query}"</p>
            <p style={{ fontSize: '0.875rem' }}>Try different keywords or check the suggested terms above.</p>
          </div>
        )}

        {searchResults.map((result, index) => (
          <div 
            key={index}
            onClick={() => handleResultClick(result)}
            style={{
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              padding: '1rem',
              marginBottom: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#7C3AED';
              e.currentTarget.style.backgroundColor = '#F9FAFB';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{getTypeIcon(result.type)}</span>
                <h4 style={{ margin: 0, color: '#1F2937' }}>{result.title}</h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {getLayerBadge(result.layer)}
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>📖 {result.timeEstimate}</span>
              </div>
            </div>
            <p style={{ margin: '0 0 0.5rem 0', color: '#4B5563', fontSize: '0.875rem' }}>
              {result.description}
            </p>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
              Relevance: {result.relevanceScore} • {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666', textAlign: 'center' }}>
          <p>💡 <strong>Smart Search:</strong> Results are ranked by relevance to your query and optimized for progressive disclosure learning.</p>
        </div>
      </div>
    </div>
  );
};

export default SemanticSearch;
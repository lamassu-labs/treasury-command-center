import React, { useState } from 'react';
import { useAnalytics } from '../Analytics/PrivacyFirstAnalytics';

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: Response[];
  example: {
    request: string;
    response: string;
  };
}

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example: string;
}

interface RequestBody {
  type: string;
  description: string;
  example: string;
}

interface Response {
  status: number;
  description: string;
  example: string;
}

// Treasury Command Center API Documentation
const apiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/treasury/portfolios',
    description: 'Retrieve all treasury portfolios with current balances and performance metrics',
    parameters: [
      {
        name: 'chain',
        type: 'string',
        required: false,
        description: 'Filter by blockchain (ethereum, polygon, arbitrum)',
        example: 'ethereum'
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Maximum number of portfolios to return',
        example: '10'
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Successfully retrieved portfolios',
        example: JSON.stringify({
          portfolios: [
            {
              id: 'portfolio-001',
              name: 'Main Treasury',
              chain: 'ethereum',
              totalValue: '2500000.00',
              currency: 'USD',
              lastUpdated: '2024-01-15T10:30:00Z'
            }
          ],
          total: 1
        }, null, 2)
      }
    ],
    example: {
      request: 'curl -X GET "https://api.treasury-cc.com/v1/treasury/portfolios?chain=ethereum&limit=10" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json"',
      response: JSON.stringify({
        portfolios: [
          {
            id: 'portfolio-001',
            name: 'Main Treasury',
            chain: 'ethereum',
            totalValue: '2500000.00',
            currency: 'USD',
            assets: [
              { symbol: 'ETH', amount: '1000.50', value: '2000000.00' },
              { symbol: 'USDC', amount: '500000.00', value: '500000.00' }
            ],
            lastUpdated: '2024-01-15T10:30:00Z'
          }
        ],
        total: 1,
        success: true
      }, null, 2)
    }
  },
  {
    method: 'POST',
    path: '/api/v1/treasury/transactions',
    description: 'Create a new treasury transaction with automated risk assessment',
    requestBody: {
      type: 'application/json',
      description: 'Transaction details for processing',
      example: JSON.stringify({
        from: '0x742d35Cc6634C0532925a3b8D8c1d5e4e2e7B7c3',
        to: '0x8ba1f109551bD432803012645Hf4D7c7C8D3D2F6',
        amount: '100.50',
        asset: 'ETH',
        chain: 'ethereum',
        priority: 'high'
      }, null, 2)
    },
    responses: [
      {
        status: 201,
        description: 'Transaction created successfully',
        example: JSON.stringify({
          transactionId: 'tx-abc123',
          status: 'pending',
          estimatedConfirmation: '2024-01-15T10:35:00Z',
          gasEstimate: '0.002',
          riskScore: 'low'
        }, null, 2)
      }
    ],
    example: {
      request: 'curl -X POST "https://api.treasury-cc.com/v1/treasury/transactions" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "from": "0x742d35Cc6634C0532925a3b8D8c1d5e4e2e7B7c3",\n    "to": "0x8ba1f109551bD432803012645Hf4D7c7C8D3D2F6",\n    "amount": "100.50",\n    "asset": "ETH",\n    "chain": "ethereum"\n  }\'',
      response: JSON.stringify({
        transactionId: 'tx-abc123',
        status: 'pending',
        txHash: '0x1234567890abcdef...',
        estimatedConfirmation: '2024-01-15T10:35:00Z',
        gasEstimate: '0.002',
        riskScore: 'low',
        automation: {
          complianceCheck: 'passed',
          riskAssessment: 'approved',
          multiSigRequired: false
        },
        success: true
      }, null, 2)
    }
  },
  {
    method: 'GET',
    path: '/api/v1/analytics/performance',
    description: 'Get treasury performance analytics with AI-powered insights',
    parameters: [
      {
        name: 'period',
        type: 'string',
        required: false,
        description: 'Time period for analysis (7d, 30d, 90d, 1y)',
        example: '30d'
      },
      {
        name: 'metrics',
        type: 'string',
        required: false,
        description: 'Comma-separated metrics (roi, volatility, drawdown)',
        example: 'roi,volatility'
      }
    ],
    responses: [
      {
        status: 200,
        description: 'Performance analytics retrieved',
        example: JSON.stringify({
          period: '30d',
          totalReturn: '12.5%',
          volatility: '8.2%',
          maxDrawdown: '3.1%',
          aiInsights: [
            'Portfolio outperforming benchmark by 4.2%',
            'Low correlation with traditional assets detected'
          ]
        }, null, 2)
      }
    ],
    example: {
      request: 'curl -X GET "https://api.treasury-cc.com/v1/analytics/performance?period=30d&metrics=roi,volatility" \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
      response: JSON.stringify({
        period: '30d',
        totalReturn: '12.5%',
        volatility: '8.2%',
        maxDrawdown: '3.1%',
        sharpeRatio: 1.52,
        benchmarkComparison: {
          outperformance: '4.2%',
          correlation: 0.23
        },
        aiInsights: [
          'Portfolio outperforming benchmark by 4.2%',
          'Low correlation with traditional assets detected',
          'Consider rebalancing ETH allocation for optimal risk-adjusted returns'
        ],
        riskMetrics: {
          valueAtRisk: '2.1%',
          conditionalVaR: '3.8%',
          riskScore: 'moderate'
        },
        success: true
      }, null, 2)
    }
  }
];

interface InteractiveApiDocsProps {
  isVisible: boolean;
  onClose: () => void;
}

export const InteractiveApiDocs: React.FC<InteractiveApiDocsProps> = ({ isVisible, onClose }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(apiEndpoints[0]);
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');
  const { trackLayerNavigation } = useAnalytics();

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return '#059669';
      case 'POST': return '#0284c7';
      case 'PUT': return '#d97706';
      case 'DELETE': return '#dc2626';
      default: return '#6B7280';
    }
  };

  const handleEndpointSelect = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    trackLayerNavigation('API-Documentation', endpoint.path);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple feedback could be added here
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
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        overflow: 'hidden',
        width: '1200px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #E5E7EB',
          backgroundColor: '#F9FAFB',
        }}>
          <h2 style={{ margin: 0 }}>🔗 Treasury Command Center API</h2>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '1.5rem', 
              cursor: 'pointer',
              color: '#6B7280',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Endpoint List */}
          <div style={{ 
            width: '300px', 
            borderRight: '1px solid #E5E7EB', 
            padding: '1rem',
            overflowY: 'auto',
            backgroundColor: '#FAFAFA',
          }}>
            <h3 style={{ marginTop: 0, fontSize: '1rem', color: '#374151' }}>API Endpoints</h3>
            {apiEndpoints.map((endpoint, index) => (
              <div
                key={index}
                onClick={() => handleEndpointSelect(endpoint)}
                style={{
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  border: `2px solid ${selectedEndpoint === endpoint ? '#7C3AED' : '#E5E7EB'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: selectedEndpoint === endpoint ? '#F3F0FF' : 'white',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  if (selectedEndpoint !== endpoint) {
                    e.currentTarget.style.borderColor = '#D1D5DB';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedEndpoint !== endpoint) {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{
                    backgroundColor: getMethodColor(endpoint.method),
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  }}>
                    {endpoint.method}
                  </span>
                  <code style={{ fontSize: '0.875rem', color: '#374151' }}>
                    {endpoint.path.length > 20 ? endpoint.path.substring(0, 20) + '...' : endpoint.path}
                  </code>
                </div>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.75rem', 
                  color: '#6B7280',
                  lineHeight: '1.3',
                }}>
                  {endpoint.description.length > 60 ? endpoint.description.substring(0, 60) + '...' : endpoint.description}
                </p>
              </div>
            ))}
          </div>

          {/* Endpoint Details */}
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{
                  backgroundColor: getMethodColor(selectedEndpoint.method),
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                }}>
                  {selectedEndpoint.method}
                </span>
                <code style={{ 
                  backgroundColor: '#F3F4F6',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  flex: 1,
                }}>
                  {selectedEndpoint.path}
                </code>
              </div>
              <p style={{ color: '#4B5563', marginBottom: '1.5rem' }}>
                {selectedEndpoint.description}
              </p>
            </div>

            {/* Parameters */}
            {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#374151', marginBottom: '0.75rem' }}>Parameters</h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F9FAFB' }}>
                        <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #E5E7EB' }}>Name</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #E5E7EB' }}>Type</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #E5E7EB' }}>Required</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #E5E7EB' }}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEndpoint.parameters.map((param, index) => (
                        <tr key={index}>
                          <td style={{ padding: '0.5rem', border: '1px solid #E5E7EB' }}>
                            <code>{param.name}</code>
                          </td>
                          <td style={{ padding: '0.5rem', border: '1px solid #E5E7EB' }}>{param.type}</td>
                          <td style={{ padding: '0.5rem', border: '1px solid #E5E7EB' }}>
                            <span style={{ 
                              color: param.required ? '#dc2626' : '#059669',
                              fontWeight: 'bold',
                            }}>
                              {param.required ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td style={{ padding: '0.5rem', border: '1px solid #E5E7EB' }}>{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Example Tabs */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid #E5E7EB' }}>
                <button
                  onClick={() => setActiveTab('request')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    borderBottom: `2px solid ${activeTab === 'request' ? '#7C3AED' : 'transparent'}`,
                    color: activeTab === 'request' ? '#7C3AED' : '#6B7280',
                    cursor: 'pointer',
                    fontWeight: activeTab === 'request' ? 'bold' : 'normal',
                  }}
                >
                  📤 Example Request
                </button>
                <button
                  onClick={() => setActiveTab('response')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    borderBottom: `2px solid ${activeTab === 'response' ? '#7C3AED' : 'transparent'}`,
                    color: activeTab === 'response' ? '#7C3AED' : '#6B7280',
                    cursor: 'pointer',
                    fontWeight: activeTab === 'response' ? 'bold' : 'normal',
                  }}
                >
                  📥 Example Response
                </button>
              </div>
            </div>

            {/* Code Examples */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => copyToClipboard(activeTab === 'request' ? selectedEndpoint.example.request : selectedEndpoint.example.response)}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: '#374151',
                  color: 'white',
                  border: 'none',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '3px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  zIndex: 1,
                }}
              >
                📋 Copy
              </button>
              <pre style={{
                backgroundColor: '#1F2937',
                color: '#F9FAFB',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                margin: 0,
              }}>
                <code>
                  {activeTab === 'request' ? selectedEndpoint.example.request : selectedEndpoint.example.response}
                </code>
              </pre>
            </div>

            {/* Documentation Links */}
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              backgroundColor: '#F0F9FF',
              borderRadius: '6px',
              border: '1px solid #0EA5E9',
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#0C4A6E' }}>📚 Additional Resources</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/api/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0EA5E9', textDecoration: 'none', fontSize: '0.875rem' }}
                >
                  📖 Full API Documentation
                </a>
                <a 
                  href="https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/getting-started/QUICK_START.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0EA5E9', textDecoration: 'none', fontSize: '0.875rem' }}
                >
                  🚀 Quick Start Guide
                </a>
                <a 
                  href="https://github.com/lamassu-labs/treasury-command-center/blob/main/docs/technical/ARCHITECTURE_OVERVIEW.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0EA5E9', textDecoration: 'none', fontSize: '0.875rem' }}
                >
                  🏗️ Architecture Overview
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveApiDocs;
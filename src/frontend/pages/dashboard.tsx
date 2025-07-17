/**
 * Treasury Monitor Dashboard Page - Simplified Version
 * Enterprise dashboard for treasury monitoring
 */

import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

interface TreasuryMetrics {
  totalValue: number
  addressCount: number
  alertsCount: number
  lastUpdate: string
}

interface TreasuryAlert {
  id: string
  level: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: string
  address: string
}

const DashboardPage: React.FC = () => {
  const { user, token } = useAuth()
  const [metrics, setMetrics] = useState<TreasuryMetrics | null>(null)
  const [alerts, setAlerts] = useState<TreasuryAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Mock data for demonstration
        const mockMetrics: TreasuryMetrics = {
          totalValue: 1250000,
          addressCount: 15,
          alertsCount: 3,
          lastUpdate: new Date().toISOString()
        }

        const mockAlerts: TreasuryAlert[] = [
          {
            id: '1',
            level: 'high',
            message: 'Large transaction detected',
            timestamp: new Date().toISOString(),
            address: 'addr1qxy7ty8qb2j8vhq7j8h5m9nw5k3l2d8f6g7h8j9k0'
          },
          {
            id: '2',
            level: 'medium',
            message: 'Unusual staking activity',
            timestamp: new Date().toISOString(),
            address: 'addr1qxy7ty8qb2j8vhq7j8h5m9nw5k3l2d8f6g7h8j9k1'
          },
          {
            id: '3',
            level: 'low',
            message: 'Regular maintenance alert',
            timestamp: new Date().toISOString(),
            address: 'addr1qxy7ty8qb2j8vhq7j8h5m9nw5k3l2d8f6g7h8j9k2'
          }
        ]

        setMetrics(mockMetrics)
        setAlerts(mockAlerts)

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-purple-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">₳</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Treasury Monitor</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.first_name || user?.email}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors">
                Add Address
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Start Monitoring
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="text-red-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">💰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics?.totalValue || 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📍</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Addresses</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.addressCount || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-lg">🚨</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🔄</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Last Update</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics?.lastUpdate ? new Date(metrics.lastUpdate).toLocaleTimeString() : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Alerts */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
            </div>
            <div className="p-6">
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl">✅</span>
                  <h4 className="text-lg font-medium text-gray-900 mt-2">All Clear</h4>
                  <p className="text-gray-500 mt-1">No alerts detected across your monitored addresses</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.level)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm opacity-75 mt-1">
                            {alert.address.slice(0, 8)}...{alert.address.slice(-6)} • {new Date(alert.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                          {alert.level.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {[
                  { icon: '📍', label: 'Add New Address to Monitor' },
                  { icon: '📊', label: 'Generate Portfolio Report' },
                  { icon: '🔔', label: 'Configure Alert Settings' },
                  { icon: '📈', label: 'View Historical Data' },
                  { icon: '🔑', label: 'Manage API Keys' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Enterprise Features</h4>
                <div className="space-y-2">
                  {[
                    'Multi-signature wallet support',
                    'Advanced compliance reporting',
                    '24/7 monitoring with instant alerts',
                    'Dedicated support team'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 text-lg">🔒</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Enterprise Security & Compliance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Data Protection',
                    description: 'Your treasury data is encrypted end-to-end and never shared with third parties.'
                  },
                  {
                    title: 'Compliance',
                    description: 'SOC 2 Type II certified with regular security audits and penetration testing.'
                  },
                  {
                    title: 'Monitoring',
                    description: '24/7 infrastructure monitoring with 99.9% uptime SLA and instant failover.'
                  }
                ].map((item, index) => (
                  <div key={index}>
                    <strong className="text-sm font-medium text-gray-900">{item.title}:</strong>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';

interface AnalyticsEvent {
  event: string;
  page: string;
  persona?: string;
  layer?: string;
  timestamp: number;
  sessionId: string;
}

interface AnalyticsData {
  pageViews: Record<string, number>;
  personaEngagement: Record<string, number>;
  layerProgression: Record<string, number>;
  averageTimeOnPage: Record<string, number>;
  totalSessions: number;
}

// Privacy-first analytics that stores data locally
class PrivacyFirstAnalytics {
  private sessionId: string;
  private startTime: number;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.loadStoredEvents();
  }

  private generateSessionId(): string {
    return `tcc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadStoredEvents(): void {
    try {
      const stored = localStorage.getItem('tcc_analytics_events');
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Analytics: Failed to load stored events');
    }
  }

  private saveEvents(): void {
    try {
      // Keep only last 100 events to prevent storage bloat
      const recentEvents = this.events.slice(-100);
      localStorage.setItem('tcc_analytics_events', JSON.stringify(recentEvents));
    } catch (error) {
      console.warn('Analytics: Failed to save events');
    }
  }

  trackPageView(page: string): void {
    const event: AnalyticsEvent = {
      event: 'page_view',
      page,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };
    
    this.events.push(event);
    this.saveEvents();
  }

  trackPersonaSelection(persona: string): void {
    const event: AnalyticsEvent = {
      event: 'persona_selection',
      page: window.location.pathname,
      persona,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };
    
    this.events.push(event);
    this.saveEvents();
  }

  trackLayerNavigation(layer: string, destination: string): void {
    const event: AnalyticsEvent = {
      event: 'layer_navigation',
      page: window.location.pathname,
      layer,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };
    
    this.events.push(event);
    this.saveEvents();
  }

  trackTimeOnPage(): void {
    const timeSpent = Date.now() - this.startTime;
    const event: AnalyticsEvent = {
      event: 'time_on_page',
      page: window.location.pathname,
      timestamp: timeSpent,
      sessionId: this.sessionId,
    };
    
    this.events.push(event);
    this.saveEvents();
  }

  getAnalyticsData(): AnalyticsData {
    const data: AnalyticsData = {
      pageViews: {},
      personaEngagement: {},
      layerProgression: {},
      averageTimeOnPage: {},
      totalSessions: 0,
    };

    const sessions = new Set<string>();

    this.events.forEach(event => {
      sessions.add(event.sessionId);

      switch (event.event) {
        case 'page_view':
          data.pageViews[event.page] = (data.pageViews[event.page] || 0) + 1;
          break;
        case 'persona_selection':
          if (event.persona) {
            data.personaEngagement[event.persona] = (data.personaEngagement[event.persona] || 0) + 1;
          }
          break;
        case 'layer_navigation':
          if (event.layer) {
            data.layerProgression[event.layer] = (data.layerProgression[event.layer] || 0) + 1;
          }
          break;
        case 'time_on_page':
          data.averageTimeOnPage[event.page] = event.timestamp;
          break;
      }
    });

    data.totalSessions = sessions.size;
    return data;
  }

  exportData(): string {
    return JSON.stringify({
      metadata: {
        exportDate: new Date().toISOString(),
        platform: 'Treasury Command Center Documentation',
        version: '1.0.0',
      },
      analytics: this.getAnalyticsData(),
      rawEvents: this.events,
    }, null, 2);
  }

  clearData(): void {
    this.events = [];
    localStorage.removeItem('tcc_analytics_events');
  }
}

// Global analytics instance
const analytics = new PrivacyFirstAnalytics();

export const useAnalytics = () => {
  const location = useLocation();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Track page view on route change
    analytics.trackPageView(location.pathname);

    // Track time on page when leaving
    const handleBeforeUnload = () => {
      analytics.trackTimeOnPage();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);

  const trackPersonaSelection = (persona: string) => {
    analytics.trackPersonaSelection(persona);
  };

  const trackLayerNavigation = (layer: string, destination: string) => {
    analytics.trackLayerNavigation(layer, destination);
  };

  const getAnalyticsData = () => {
    return analytics.getAnalyticsData();
  };

  const exportAnalytics = () => {
    return analytics.exportData();
  };

  const clearAnalytics = () => {
    analytics.clearData();
    setAnalyticsData(null);
  };

  return {
    trackPersonaSelection,
    trackLayerNavigation,
    getAnalyticsData,
    exportAnalytics,
    clearAnalytics,
    analyticsData,
  };
};

// Analytics Dashboard Component
export const AnalyticsDashboard: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ 
  isVisible, 
  onClose 
}) => {
  const { getAnalyticsData, exportAnalytics, clearAnalytics } = useAnalytics();
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    if (isVisible) {
      setData(getAnalyticsData());
    }
  }, [isVisible, getAnalyticsData]);

  if (!isVisible || !data) return null;

  const handleExport = () => {
    const exportData = exportAnalytics();
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tcc-analytics-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        width: '90%',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>📊 Analytics Dashboard</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
            ✕
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3>📈 Page Views</h3>
          {Object.entries(data.pageViews).map(([page, views]) => (
            <div key={page} style={{ margin: '0.5rem 0' }}>
              <strong>{page}:</strong> {views} views
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3>👥 Persona Engagement</h3>
          {Object.entries(data.personaEngagement).map(([persona, count]) => (
            <div key={persona} style={{ margin: '0.5rem 0' }}>
              <strong>{persona}:</strong> {count} selections
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3>🎯 Layer Progression</h3>
          {Object.entries(data.layerProgression).map(([layer, count]) => (
            <div key={layer} style={{ margin: '0.5rem 0' }}>
              <strong>Layer {layer}:</strong> {count} navigations
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p><strong>Total Sessions:</strong> {data.totalSessions}</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={handleExport}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#7C3AED',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            📁 Export Data
          </button>
          <button 
            onClick={() => {
              clearAnalytics();
              setData(getAnalyticsData());
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🗑️ Clear Data
          </button>
        </div>

        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          <p>🔒 <strong>Privacy First:</strong> All analytics data is stored locally in your browser. No data is sent to external servers.</p>
        </div>
      </div>
    </div>
  );
};

export default analytics;
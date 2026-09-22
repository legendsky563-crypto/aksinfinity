'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, ZoomIn, X, ExternalLink } from 'lucide-react';

interface ProjectMapSectionProps {
  projectName: string;
  location: string;
  mapImage?: string;
  googleMapQuery?: string;
}

export default function ProjectMapSection({
  projectName,
  location,
  mapImage = '/images/real/holy-project2.jpg',
  googleMapQuery,
}: ProjectMapSectionProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'googlemap'>('blueprint');

  // Query formatting for Google Maps embed & direct navigation
  const query = googleMapQuery || `${projectName} ${location} Delhi NCR`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const directMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className="property-section" style={{ marginTop: 'var(--space-10)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--color-champagne)' }}>LOCATION & MASTER LAYOUT</span>
          <h3 className="property-section-title" style={{ marginBottom: 0 }}>
            Real Blueprint & Satellite Map
          </h3>
        </div>

        {/* View Switcher Tabs */}
        <div className="project-map-tabs" style={{ display: 'flex', gap: 'var(--space-2)', background: 'var(--color-surface)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mist)' }}>
          <button
            type="button"
            className="project-map-tab-btn"
            onClick={() => setActiveTab('blueprint')}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-xs)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              transition: 'all var(--transition-fast)',
              backgroundColor: activeTab === 'blueprint' ? 'var(--color-champagne)' : 'transparent',
              color: activeTab === 'blueprint' ? '#FFFFFF' : 'var(--color-charcoal)',
            }}
          >
            Township Blueprint Map
          </button>
          <button
            type="button"
            className="project-map-tab-btn"
            onClick={() => setActiveTab('googlemap')}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-xs)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              transition: 'all var(--transition-fast)',
              backgroundColor: activeTab === 'googlemap' ? 'var(--color-champagne)' : 'transparent',
              color: activeTab === 'googlemap' ? '#FFFFFF' : 'var(--color-charcoal)',
            }}
          >
            Google Maps & Navigation
          </button>
        </div>
      </div>

      {activeTab === 'blueprint' ? (
        <div>
          <div
            className="project-map-container"
            onClick={() => setIsLightboxOpen(true)}
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid var(--color-mist)',
              boxShadow: 'var(--shadow-md)',
              backgroundColor: '#0F1117',
            }}
          >
            <Image
              src={mapImage}
              alt={`${projectName} Master Layout Map`}
              fill
              sizes="(max-width: 1200px) 100vw, 800px"
              style={{ objectFit: 'contain' }}
            />
            
            {/* Overlay hint */}
            <div style={{
              position: 'absolute',
              bottom: 'var(--space-4)',
              right: 'var(--space-4)',
              background: 'rgba(10, 10, 14, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              border: '1px solid rgba(201,169,110,0.4)',
            }}>
              <ZoomIn size={16} color="var(--color-champagne)" />
              <span>Click to Zoom Blueprint & Plot Demarcations</span>
            </div>

            <div style={{
              position: 'absolute',
              top: 'var(--space-4)',
              left: 'var(--space-4)',
              background: 'rgba(10, 10, 14, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-champagne-light)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: '0.5px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              Official Site Plan
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-3)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-muted)', margin: 0 }}>
              * Detailed on-site demarcation map with road widths, plot numbers, corner allocations, and utility easements.
            </p>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ZoomIn size={14} />
              Full Screen Layout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="project-map-container"
            style={{
              width: '100%',
              height: '420px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--color-mist)',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${projectName} Google Map`}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-3)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="var(--color-champagne)" />
              {location}
            </span>
            <a
              href={directMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ExternalLink size={14} />
              Open in Google Maps
            </a>
          </div>
        </div>
      )}

      {/* Blueprint Zoom Modal / Lightbox */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 8, 0.96)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2500,
            padding: 'var(--space-6)',
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
            aria-label="Close Blueprint Modal"
            style={{
              position: 'absolute',
              top: 'var(--space-6)',
              right: 'var(--space-6)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              height: '80vh',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              backgroundColor: '#0F1117',
            }}
          >
            <Image
              src={mapImage}
              alt={`${projectName} Master Layout Plan`}
              fill
              sizes="95vw"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block' }}>
              {projectName} — Official Demarcation Layout
            </span>
            <p style={{ color: '#FFFFFF', fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', marginTop: '2px' }}>
              Pari Chowk / Yamuna Expressway Corridor • AKS Infinity
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

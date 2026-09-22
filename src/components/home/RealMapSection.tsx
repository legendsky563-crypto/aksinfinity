'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Phone } from 'lucide-react';

interface LocationInfo {
  id: string;
  name: string;
  category: string;
  address: string;
  connectivity: string[];
  embedUrl: string;
  directMapUrl: string;
}

const locations: LocationInfo[] = [
  {
    id: 'office',
    name: 'Headquarters & Advisory Office',
    category: 'Corporate Office',
    address: 'Office No. 321, 3rd Floor, US Complex, Metro Station Jasola Apollo, Mathura Road, New Delhi 110076',
    connectivity: [
      'Jasola Apollo Metro Station: 50 meters (Walking distance)',
      'Mathura Road (NH-19) frontage with direct expressway link',
      'South Delhi & Noida access within 10-15 minutes',
    ],
    embedUrl: 'https://maps.google.com/maps?q=US+Complex+Jasola+Apollo+Metro+Station+Mathura+Road+New+Delhi+110076&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directMapUrl: 'https://www.google.com/maps/search/?api=1&query=US+Complex+Jasola+Apollo+Metro+Station+Mathura+Road+New+Delhi',
  },
  {
    id: 'holy-family',
    name: 'Holy Family Township Project',
    category: 'Residential Township Plots',
    address: 'Near Sector 150 & Pari Chowk corridor, Greater Noida, Uttar Pradesh',
    connectivity: [
      'Pari Chowk & Knowledge Park: 10 mins',
      'Aqua Line Metro Station: 5 km',
      'Schools, Hospitals & Retail Market: 1-2 km radius',
    ],
    embedUrl: 'https://maps.google.com/maps?q=Pari+Chowk+Greater+Noida+Uttar+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed',
    directMapUrl: 'https://www.google.com/maps/search/?api=1&query=Pari+Chowk+Greater+Noida',
  },
  {
    id: 'garhi',
    name: 'Garhi Saamstipur Phase-3-1',
    category: 'High-Growth Investment Plots',
    address: 'Garhi Saamstipur, Yamuna Expressway Corridor near Jewar International Airport',
    connectivity: [
      'Noida International Airport (Jewar): ~18-20 km',
      'Yamuna Expressway Entry: 3 km',
      'Upcoming Film City & Industrial Hub: 15 mins',
    ],
    embedUrl: 'https://maps.google.com/maps?q=Yamuna+Expressway+Jewar+Uttar+Pradesh&t=&z=12&ie=UTF8&iwloc=&output=embed',
    directMapUrl: 'https://www.google.com/maps/search/?api=1&query=Yamuna+Expressway+Jewar',
  },
  {
    id: 'dudhola',
    name: 'Dudhola Farm House Enclave',
    category: 'Farmhouse & Retreat Land',
    address: 'Dudhola green enclave, Greater Noida & Palwal connectivity zone',
    connectivity: [
      'Greater Noida City Center: 12 km',
      'Wide 40 ft metalled approach road',
      'Borewell water supply and lush green surroundings',
    ],
    embedUrl: 'https://maps.google.com/maps?q=Dudhola+Haryana+India&t=&z=13&ie=UTF8&iwloc=&output=embed',
    directMapUrl: 'https://www.google.com/maps/search/?api=1&query=Dudhola+Farm+House',
  },
];

export default function RealMapSection() {
  const [activeTab, setActiveTab] = useState<string>('office');
  const activeLoc = locations.find((l) => l.id === activeTab) || locations[0];

  return (
    <section id="map" className="section" style={{ borderTop: '1px solid var(--color-mist)' }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">REAL-WORLD LOCATION & CONNECTIVITY</span>
          <h2 className="heading-2">Interactive Location Map</h2>
          <p className="body-lg">
            Explore our registered New Delhi corporate office and key on-site project developments across Greater Noida and Yamuna Expressway.
          </p>
        </div>

        {/* Location Switcher Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          justifyContent: 'center',
          marginBottom: 'var(--space-8)',
        }}>
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveTab(loc.id)}
              style={{
                padding: 'var(--space-3) var(--space-6)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                letterSpacing: '0.5px',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer',
                border: activeTab === loc.id ? '1px solid var(--color-champagne)' : '1px solid var(--color-mist)',
                backgroundColor: activeTab === loc.id ? 'var(--color-champagne)' : 'var(--color-white)',
                color: activeTab === loc.id ? '#FFFFFF' : 'var(--color-charcoal)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              <MapPin size={15} style={{ color: activeTab === loc.id ? '#FFFFFF' : 'var(--color-champagne)' }} />
              <span>{loc.name.split(' ')[0]} {loc.name.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Map & Details Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 'var(--space-8)',
          backgroundColor: 'var(--color-white)',
          border: '1px solid var(--color-mist)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
        }} className="map-grid-wrapper">
          {/* Interactive Google Map iframe */}
          <div style={{ position: 'relative', minHeight: '440px', width: '100%', backgroundColor: 'var(--color-cream)' }}>
            <iframe
              title={`Google Map - ${activeLoc.name}`}
              src={activeLoc.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px', display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Location Information Card */}
          <div style={{
            padding: 'var(--space-10) var(--space-8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <span className="eyebrow" style={{ color: 'var(--color-champagne)', marginBottom: 'var(--space-2)' }}>
              {activeLoc.category}
            </span>
            <h3 className="heading-3" style={{ marginBottom: 'var(--space-4)' }}>
              {activeLoc.name}
            </h3>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              <MapPin size={20} style={{ color: 'var(--color-champagne)', flexShrink: 0, marginTop: '3px' }} />
              <p style={{ color: 'var(--color-graphite)', fontSize: 'var(--text-base)', lineHeight: 1.6 }}>
                {activeLoc.address}
              </p>
            </div>

            <div style={{
              padding: 'var(--space-5)',
              backgroundColor: 'var(--color-cream)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-mist)',
              marginBottom: 'var(--space-6)',
            }}>
              <h4 style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--color-charcoal)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: 'var(--space-3)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}>
                <Compass size={16} style={{ color: 'var(--color-champagne)' }} />
                Connectivity Highlights
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {activeLoc.connectivity.map((point, idx) => (
                  <li key={idx} style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-stone)',
                    lineHeight: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)'
                  }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--color-champagne)', flexShrink: 0 }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <a
                href={activeLoc.directMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}
              >
                <Navigation size={15} />
                Get Directions on Google Maps
              </a>
              <a
                href="tel:+918368834467"
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}
              >
                <Phone size={15} />
                Call +91 8368834467
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

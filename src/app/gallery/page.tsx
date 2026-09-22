'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  src: string;
  title: string;
  category: string;
  location: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: '/images/real/holy-project2.jpg',
    title: 'Master Township Layout & Sector Blueprint',
    category: 'Holy Family Township',
    location: 'Greater Noida',
  },
  {
    src: '/images/real/gallery1.jpg',
    title: 'Phase 1 Boundary Wall & Demarcation',
    category: 'Holy Family Township',
    location: 'Greater Noida',
  },
  {
    src: '/images/real/gallery4.jpg',
    title: 'Internal Blacktop Avenue Roads & Plotting',
    category: 'Holy Family Township',
    location: 'Greater Noida',
  },
  {
    src: '/images/real/gallery5.jpg',
    title: 'On-Site Ground Levelling & Foundation',
    category: 'Holy Family Township',
    location: 'Greater Noida',
  },
  {
    src: '/images/real/garhi-saamstipur-phase-3-1.jpg',
    title: 'Phase 3-1 Official Plot Blueprint & Map',
    category: 'Garhi Saamstipur',
    location: 'Yamuna Expressway',
  },
  {
    src: '/images/real/gallery2.jpg',
    title: 'Expressway Frontage Plots & Survey Pegs',
    category: 'Garhi Saamstipur',
    location: 'Yamuna Expressway',
  },
  {
    src: '/images/real/jewar.jpg',
    title: 'Jewar International Airport Investment Zone',
    category: 'Garhi Saamstipur',
    location: 'Jewar Airport Zone',
  },
  {
    src: '/images/real/project2.jpg',
    title: 'Sector Demarcation & Electric Poles Setup',
    category: 'Garhi Saamstipur',
    location: 'Yamuna Expressway',
  },
  {
    src: '/images/real/dhudhola_farmhouse.jpg',
    title: 'Dudhola Farmhouse Layout & Plot Map',
    category: 'Dudhola Farm House',
    location: 'Dudhola, Greater Noida',
  },
  {
    src: '/images/real/gallery3.jpg',
    title: 'Lush Green Farmland Acreage',
    category: 'Dudhola Farm House',
    location: 'Dudhola',
  },
  {
    src: '/images/real/gallery6.jpg',
    title: 'Perimeter Boundary & Gated Enclave',
    category: 'Dudhola Farm House',
    location: 'Dudhola',
  },
  {
    src: '/images/real/park.jpg',
    title: 'Green Belt, Plantation & Landscaped Parks',
    category: 'Dudhola Farm House',
    location: 'Dudhola',
  },
  {
    src: '/images/real/metro.jpg',
    title: 'Metro Connectivity & Transit Corridors',
    category: 'Infrastructure',
    location: 'Delhi-NCR / Greater Noida',
  },
  {
    src: '/images/real/fng.jpg',
    title: 'FNG & Yamuna Expressway Arteries',
    category: 'Infrastructure',
    location: 'Expressway Interchange',
  },
  {
    src: '/images/real/school.jpg',
    title: 'Reputed Schools & University Belts',
    category: 'Infrastructure',
    location: 'Greater Noida Corridor',
  },
  {
    src: '/images/real/hospital.jpg',
    title: 'Multi-Speciality Hospital Proximity',
    category: 'Infrastructure',
    location: 'Greater Noida',
  },
  {
    src: '/images/real/jpcity.jpg',
    title: 'Jaypee Sports City Corridor',
    category: 'Infrastructure',
    location: 'Yamuna Expressway',
  },
  {
    src: '/images/real/project1.jpg',
    title: 'AKS Infinity On-Site Consultation & Verification',
    category: 'Infrastructure',
    location: 'Site Office',
  },
];

const categories = [
  'All Photos',
  'Holy Family Township',
  'Garhi Saamstipur',
  'Dudhola Farm House',
  'Infrastructure',
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Photos');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'All Photos'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <main>
      <section className="listing-hero">
        <div className="container">
          <span className="eyebrow">COMPLETE VISUAL ARCHIVE</span>
          <h1 className="heading-1" style={{ marginTop: 'var(--space-2)' }}>On-Site Project Gallery</h1>
          <p className="body-lg">
            High-definition site imagery covering our registered plot townships, natural farmhouses, internal road networks, and expressway access corridors.
          </p>
        </div>
      </section>

      <div className="container section">
        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          justifyContent: 'center',
          marginBottom: 'var(--space-10)',
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: 'var(--space-3) var(--space-6)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                letterSpacing: '0.5px',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer',
                border: selectedCategory === cat ? '1px solid var(--color-champagne)' : '1px solid var(--color-mist)',
                backgroundColor: selectedCategory === cat ? 'var(--color-champagne)' : 'var(--color-white)',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--color-charcoal)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div 
          className="gallery-page-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {filteredItems.map((item, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedItem(item)}
              style={{
                position: 'relative',
                height: '280px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--color-mist)',
                backgroundColor: 'var(--color-white)',
                transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
              }}
              className="gallery-item-card"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.2) 50%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'var(--space-5)',
                color: '#FFFFFF',
              }}>
                <span style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-champagne-light)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '2px',
                }}>
                  {item.category} • {item.location}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', fontWeight: 600 }}>
                    {item.title}
                  </h4>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(201,169,110,0.85)',
                    color: '#FFFFFF',
                    flexShrink: 0
                  }}>
                    <ZoomIn size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          onClick={() => setSelectedItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 8, 0.94)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: 'var(--space-6)',
          }}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }}
            aria-label="Close modal"
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
              transition: 'background var(--transition-fast)',
            }}
          >
            <X size={24} />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1000px',
              height: '75vh',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <Image
              src={selectedItem.src}
              alt={selectedItem.title}
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block' }}>
              {selectedItem.category} — {selectedItem.location}
            </span>
            <p style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-xl)',
              letterSpacing: '0.5px',
              marginTop: '2px',
            }}>
              {selectedItem.title}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

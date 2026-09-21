'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ZoomIn, X, ArrowRight } from 'lucide-react';

const featuredGallery = [
  {
    src: '/images/real/holy-project2.jpg',
    title: 'Holy Family Township Master Layout & Plan',
    project: 'Holy Family Township',
  },
  {
    src: '/images/real/gallery1.jpg',
    title: 'On-Site Plot Ground Work & Demarcation',
    project: 'Greater Noida Corridor',
  },
  {
    src: '/images/real/garhi-saamstipur-phase-3-1.jpg',
    title: 'Garhi Saamstipur Official Plot Map & Plan',
    project: 'Garhi Saamstipur Phase-3-1',
  },
  {
    src: '/images/real/dhudhola_farmhouse.jpg',
    title: 'Dudhola Farmhouse Layout & Green Enclave',
    project: 'Dudhola Farm House',
  },
  {
    src: '/images/real/gallery5.jpg',
    title: 'Township Internal Roads & Boundary Walls',
    project: 'Holy Family Township',
  },
  {
    src: '/images/real/jewar.jpg',
    title: 'Jewar International Airport High-Growth Hub',
    project: 'Jewar Investment Zone',
  },
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string; project: string } | null>(null);

  return (
    <section id="gallery" className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">SITE PHOTOGRAPHY & DEVELOPMENTS</span>
          <h2 className="heading-2">On-Site Project Gallery</h2>
          <p className="body-lg">
            High-resolution photography showcasing our active plot townships, approach roads, green farmhouses, and strategic infrastructure.
          </p>
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-6)',
        }}>
          {featuredGallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(item)}
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
                sizes="(max-width: 768px) 100vw, 33vw"
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
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-champagne-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
                  {item.project}
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

        {/* Action Button */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <Link 
            href="/gallery" 
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)' }}
          >
            Browse Complete Project Gallery
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
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
            onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null); }}
            aria-label="Close photo preview"
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
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block' }}>
              {selectedPhoto.project}
            </span>
            <p style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-xl)',
              letterSpacing: '0.5px',
              marginTop: '2px',
            }}>
              {selectedPhoto.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

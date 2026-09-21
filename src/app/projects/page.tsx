import { getProjects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects | AKS Infinity',
  description: 'Explore our premium plot township and farmhouse projects: Holy Family Township, Dudhola Farm House, and Garhi Saamstipur.',
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main>
      <section className="listing-hero">
        <div className="container">
          <h1 className="heading-1">Our Projects</h1>
          <p className="body-lg">Discover our premium residential and farmhouse plot projects offering exceptional lifestyle and investment potential.</p>
        </div>
      </section>

      <div className="container section">
        <div className="projects-grid property-grid">
          {projects.map(project => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="project-card property-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none' }}>
              <div className="property-card-image" style={{ height: '240px' }}>
                <Image
                  src={project.image || '/images/real/gallery4.jpg'}
                  alt={project.name}
                  width={600}
                  height={450}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="property-card-badge">{project.status}</span>
              </div>
              
              <div className="property-card-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="property-card-name" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.name}</h3>
                
                <p className="property-card-location" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--color-text-light)' }}>
                  <MapPin size={16} /> {project.location}
                </p>
                
                <p style={{ marginBottom: '1.5rem', color: 'var(--color-text)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {project.description}
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', background: 'var(--color-cream)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>Price Range</span>
                    <strong style={{ color: 'var(--color-primary)' }}>{project.priceRange}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>Area Range</span>
                    <strong style={{ color: 'var(--color-text)' }}>{project.areaRange}</strong>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>Availability</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '4px' }}>
                      <div style={{ flexGrow: 1, height: '6px', background: 'var(--color-mist)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: 'var(--color-primary)', width: `${(project.plotsSold / project.totalPlots) * 100}%` }}></div>
                      </div>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-charcoal)' }}>{project.plotsAvailable} left</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                  {project.highlights.slice(0, 3).map((highlight, idx) => (
                    <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', background: 'var(--color-cream)', color: 'var(--color-charcoal)', border: '1px solid var(--color-mist)', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}>
                      <Tag size={12} style={{ color: 'var(--color-champagne)' }} /> {highlight}
                    </span>
                  ))}
                  {project.highlights.length > 3 && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.75rem', padding: '0.25rem 0.5rem', color: 'var(--color-text-light)' }}>
                      +{project.highlights.length - 3} more
                    </span>
                  )}
                </div>
                
                <span className="btn btn-secondary" style={{ marginTop: '1.5rem', width: '100%', textAlign: 'center' }}>
                  View Project Details
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

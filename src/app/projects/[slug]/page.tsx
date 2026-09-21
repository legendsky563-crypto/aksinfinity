import { getProjectBySlug, getProjects, getProperties } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Tag, CheckCircle } from 'lucide-react';
import EnquiryForm from '@/components/properties/EnquiryForm';
import ProjectMapSection from '@/components/properties/ProjectMapSection';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const project = getProjectBySlug(p.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.name} | AKS Infinity`,
    description: project.description.substring(0, 160),
    openGraph: {
      title: `${project.name} | AKS Infinity`,
      description: project.description.substring(0, 160),
      images: project.image ? [project.image] : [],
    },
  };
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const project = getProjectBySlug(p.slug);
  
  if (!project) {
    notFound();
  }

  const allProperties = getProperties();
  const projectPlots = allProperties.filter(plot => 
    plot.project?.toLowerCase() === project.name.toLowerCase() || 
    plot.name.toLowerCase().includes(project.name.toLowerCase())
  );

  return (
    <main>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/projects">Projects</Link>
          <span className="breadcrumb-separator">/</span>
          <span>{project.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="property-detail-hero" style={{ height: '500px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '3rem' }}>
          <Image
            src={project.image || '/images/real/gallery4.jpg'}
            alt={project.name}
            width={1400}
            height={600}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            priority
          />
        </div>

        <div className="property-detail-grid">
          <div>
            <div className="property-detail-header" style={{ marginBottom: '2rem' }}>
              <span className="property-detail-type" style={{ background: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>{project.status}</span>
              <h1 className="property-detail-title" style={{ marginTop: '1rem', fontSize: '2.5rem' }}>{project.name}</h1>
              <div className="property-detail-location" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-light)', marginTop: '0.5rem', fontSize: '1.125rem' }}>
                <MapPin size={20} />
                <span>{project.location}</span>
              </div>
            </div>

            <div className="property-specs-grid" style={{ marginBottom: '3rem' }}>
              <div className="property-spec">
                <div className="property-spec-value">{project.priceRange}</div>
                <div className="property-spec-label">Price Range</div>
              </div>
              <div className="property-spec">
                <div className="property-spec-value">{project.areaRange}</div>
                <div className="property-spec-label">Area Range</div>
              </div>
              <div className="property-spec">
                <div className="property-spec-value">{project.totalPlots}</div>
                <div className="property-spec-label">Total Plots</div>
              </div>
              <div className="property-spec">
                <div className="property-spec-value">{project.plotsAvailable}</div>
                <div className="property-spec-label">Available Plots</div>
              </div>
            </div>

            <div className="property-section">
              <h3 className="property-section-title">About the Project</h3>
              <p className="body-lg" style={{ lineHeight: 1.8 }}>{project.description}</p>
            </div>

            <div className="property-section">
              <h3 className="property-section-title">Project Highlights</h3>
              <div className="amenities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="amenity-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-surface)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <CheckCircle size={18} color="var(--color-primary)" />
                    <span style={{ fontWeight: 500 }}>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {project.nearbyInfra && project.nearbyInfra.length > 0 && (
              <div className="property-section">
                <h3 className="property-section-title">Nearby Infrastructure</h3>
                <div className="nearby-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                  {project.nearbyInfra.map((infra, index) => (
                    <div key={index} className="nearby-item" style={{ background: 'var(--color-cream)', border: '1px solid var(--color-mist)', padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--color-champagne)' }}>
                      <span style={{ color: 'var(--color-charcoal)' }}>{infra}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Project Blueprint & Google Maps Section */}
            <ProjectMapSection
              projectName={project.name}
              location={project.location}
              mapImage={project.mapImage || project.image}
              googleMapQuery={`${project.name} ${project.location}`}
            />

            <div className="property-section">
              <h3 className="property-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Available Plots in {project.name}
                <Link href={`/plots?project=${encodeURIComponent(project.name)}`} className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>View All</Link>
              </h3>
              
              {projectPlots.length > 0 ? (
                <div className="property-grid">
                  {projectPlots.slice(0, 4).map(plot => (
                    <Link key={plot.id} href={`/plots/${plot.slug}`} className="property-card">
                      <div className="property-card-image">
                        <Image
                          src={plot.images[0] || '/images/real/gallery4.jpg'}
                          alt={plot.name}
                          width={600}
                          height={450}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span className="property-card-badge">{plot.type || 'Plot'}</span>
                      </div>
                      <div className="property-card-body">
                        <h4 className="property-card-name">{plot.name}</h4>
                        <div className="property-card-price">{plot.priceLabel}</div>
                        <div className="property-card-specs">
                          <span className="property-card-spec">{plot.area.toLocaleString('en-IN')} {plot.areaUnit || 'sq.yd.'}</span>
                          {plot.facing && <span className="property-card-spec">{plot.facing} Facing</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                  <p className="body-lg">No specific plots listed yet. Contact us for complete availability in this project.</p>
                </div>
              )}
            </div>
          </div>

          <div className="property-sidebar">
            <div className="sidebar-card" style={{ position: 'sticky', top: '100px' }}>
              <h3 className="sidebar-card-title">Enquire about {project.name}</h3>
              <EnquiryForm propertyName={project.name} />
              
              <div className="sidebar-buttons" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn btn-primary" style={{ width: '100%' }}>Schedule a Site Visit</button>
                <a 
                  href={`https://wa.me/918377077119?text=Hi, I'm interested in the ${project.name} project at ${project.location}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp"
                  style={{ width: '100%', textAlign: 'center', background: '#25D366', color: 'white', textDecoration: 'none', padding: '0.875rem', borderRadius: '0.25rem', fontWeight: 600 }}
                >
                  WhatsApp Enquiry
                </a>
                <a href="tel:+918368834467" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                  Call +91 8368834467
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 'var(--space-24)' }} />
    </main>
  );
}

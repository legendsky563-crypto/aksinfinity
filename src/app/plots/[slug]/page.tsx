import { getPropertyBySlug, getProperties, getProjects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import EnquiryForm from '@/components/properties/EnquiryForm';
import ProjectMapSection from '@/components/properties/ProjectMapSection';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const property = getPropertyBySlug(p.slug);
  if (!property) return { title: 'Plot Not Found' };

  return {
    title: `${property.name} | AKS Infinity`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: `${property.name} | AKS Infinity`,
      description: property.description.substring(0, 160),
      images: property.images[0] ? [property.images[0]] : [],
    },
  };
}

export async function generateStaticParams() {
  const properties = getProperties();
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const property = getPropertyBySlug(p.slug);
  
  if (!property) {
    notFound();
  }

  const allProperties = getProperties();
  const projects = getProjects();
  const relatedProject = projects.find(proj => 
    proj.name.toLowerCase() === property.project?.toLowerCase() ||
    property.name.toLowerCase().includes(proj.name.toLowerCase())
  );

  const similarProperties = allProperties
    .filter(sp => sp.locality === property.locality && sp.slug !== property.slug)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.name,
    "description": property.description,
    "url": `/plots/${property.slug}`,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "INR"
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/plots">Plots</Link>
          <span className="breadcrumb-separator">/</span>
          <span>{property.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="property-detail-hero">
          <Image
            src={property.images[0] || '/images/real/gallery4.jpg'}
            alt={property.name}
            width={1400}
            height={600}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            priority
          />
        </div>

        {property.images.length > 1 && (
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
            {property.images.map((img, idx) => (
              <div 
                key={idx}
                style={{ 
                  position: 'relative', 
                  width: '140px', 
                  height: '90px', 
                  borderRadius: 'var(--radius-sm)', 
                  overflow: 'hidden', 
                  border: '1px solid var(--color-mist)',
                  flexShrink: 0
                }}
              >
                <Image
                  src={img}
                  alt={`${property.name} photo ${idx + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="property-detail-header">
          <span className="property-detail-type">{property.type || 'Plot'}</span>
          <h1 className="property-detail-title">{property.name}</h1>
          <div className="property-detail-location">
            <MapPin size={20} />
            <span>{property.location}</span>
          </div>
          <div className="property-detail-price">{property.priceLabel}</div>
        </div>

        <div className="property-detail-grid">
          <div>
            <div className="property-specs-grid">
              <div className="property-spec">
                <div className="property-spec-value">{property.area.toLocaleString('en-IN')} {property.areaUnit || 'sq.yd.'}</div>
                <div className="property-spec-label">Area</div>
              </div>
              <div className="property-spec">
                <div className="property-spec-value">{property.dimensions || 'Contact for details'}</div>
                <div className="property-spec-label">Dimensions</div>
              </div>
              <div className="property-spec">
                <div className="property-spec-value">{property.facing || 'Varies'}</div>
                <div className="property-spec-label">Facing</div>
              </div>
              <div className="property-spec">
                <div className="property-spec-value">{property.roadWidth || 'Contact for details'}</div>
                <div className="property-spec-label">Road Width</div>
              </div>
              <div className="property-spec">
                <div className="property-spec-value">{property.registryStatus || 'Available'}</div>
                <div className="property-spec-label">Registry Status</div>
              </div>
              <div className="property-spec">
                <div className="property-spec-value">{property.developmentStatus || 'Ready to move'}</div>
                <div className="property-spec-label">Development Status</div>
              </div>
              <div className="property-spec">
                <div className="property-spec-value">{property.possessionStatus || 'Immediate'}</div>
                <div className="property-spec-label">Possession</div>
              </div>
              <div className="property-spec">
                <div className="property-spec-value">{property.status}</div>
                <div className="property-spec-label">Status</div>
              </div>
            </div>

            <div className="property-section">
              <h3 className="property-section-title">Overview</h3>
              <p className="body-lg">{property.overview || property.description}</p>
            </div>

            <div className="property-section">
              <h3 className="property-section-title">Description</h3>
              <p className="body-lg">{property.description}</p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="property-section">
                <h3 className="property-section-title">Amenities & Features</h3>
                <div className="amenities-grid">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
              <div className="property-section">
                <h3 className="property-section-title">Nearby Places</h3>
                <div className="nearby-grid">
                  {property.nearbyPlaces.map((place, index) => (
                    <div key={index} className="nearby-item">
                      <span>{place}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Real Project Blueprint & Google Map */}
            <ProjectMapSection
              projectName={property.project || property.name}
              location={property.location}
              mapImage={relatedProject?.mapImage || property.images[0] || '/images/real/holy-project2.jpg'}
              googleMapQuery={`${property.project || property.name} ${property.location}`}
            />

            {similarProperties.length > 0 && (
              <div className="property-section">
                <h3 className="property-section-title">Similar Plots</h3>
                <div className="property-grid">
                  {similarProperties.map(sp => (
                    <Link key={sp.id} href={`/plots/${sp.slug}`} className="property-card">
                      <div className="property-card-image">
                        <Image
                          src={sp.images[0] || '/images/real/gallery4.jpg'}
                          alt={sp.name}
                          width={600}
                          height={450}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="property-card-body">
                        <span className="property-card-type">{sp.type || 'Plot'}</span>
                        <h4 className="property-card-name">{sp.name}</h4>
                        <p className="property-card-location">
                          <MapPin size={14} /> {sp.location}
                        </p>
                        <div className="property-card-price">{sp.priceLabel}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="property-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Interested in this plot?</h3>
              <EnquiryForm propertyName={property.name} />
              
              <div className="sidebar-buttons">
                <button className="btn btn-primary">Schedule a Site Visit</button>
                <a 
                  href={`https://wa.me/918377077119?text=Hi, I'm interested in ${property.name} at ${property.location}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp"
                >
                  WhatsApp Enquiry
                </a>
                <a href="tel:+918368834467" className="btn btn-secondary">
                  Call Now
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

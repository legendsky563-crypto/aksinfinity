import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Compass, ShieldCheck } from 'lucide-react';
import { getFeaturedProperties, getProperties } from '@/lib/data';

export default async function FeaturedProperties() {
  const featured = await Promise.resolve(getFeaturedProperties());
  const allProperties = await Promise.resolve(getProperties());
  const plots = featured.length >= 3 ? featured.slice(0, 3) : allProperties.slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">HANDPICKED SELECTION</span>
          <h2 className="heading-2">Featured Plots</h2>
          <p className="body-lg">
            Carefully selected plots across our active projects, chosen for their strategic location, value, and high appreciation potential.
          </p>
        </div>

        <div className="property-grid">
          {plots.map((plot) => (
            <Link key={plot.id} href={`/plots/${plot.slug}`} className="property-card">
              <div className="property-card-image">
                <Image 
                  src={plot.images[0] || '/images/real/gallery4.jpg'} 
                  alt={plot.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="property-card-badge">{plot.type}</span>
                {plot.registryStatus && (
                  <span className="property-card-status available">
                    {plot.registryStatus}
                  </span>
                )}
              </div>

              <div className="property-card-body">
                <span className="property-card-type">{plot.project}</span>
                <h3 className="property-card-name">{plot.name}</h3>
                
                <p className="property-card-location">
                  <MapPin size={14} />
                  <span>{plot.location}</span>
                </p>

                <div className="property-card-price">{plot.priceLabel}</div>

                <div className="property-card-specs">
                  <span className="property-card-spec">
                    <strong>{plot.area}</strong> {plot.areaUnit || 'sq.yd.'}
                  </span>
                  {plot.facing && (
                    <span className="property-card-spec">
                      <Compass size={14} /> {plot.facing}
                    </span>
                  )}
                  {plot.roadWidth && (
                    <span className="property-card-spec">
                      <ShieldCheck size={14} /> {plot.roadWidth} Road
                    </span>
                  )}
                </div>

                <span className="property-card-cta">
                  View Plot Details &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <Link href="/plots" className="btn btn-secondary">
            View All Available Plots
          </Link>
        </div>
      </div>
    </section>
  );
}

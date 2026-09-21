import Link from 'next/link';
import Image from 'next/image';
import { getLocations } from '@/lib/data';

export default async function Localities() {
  const localities = await Promise.resolve(getLocations());

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">HIGH-GROWTH CORRIDORS</span>
          <h2 className="heading-2">Explore Investment Locations</h2>
          <p className="body-lg">
            Strategic land banks selected for rapid capital appreciation, metro connectivity, expressway corridors, and proximity to Noida International Airport.
          </p>
        </div>

        <div className="locality-grid">
          {localities.slice(0, 6).map((loc) => (
            <Link key={loc.id} href={`/plots?locality=${encodeURIComponent(loc.name)}`} className="locality-card">
              <Image 
                src={loc.image || '/images/real/gallery4.jpg'} 
                alt={loc.name} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="locality-card-overlay">
                <h3 className="locality-card-name">{loc.name}</h3>
                <p className="locality-card-count">{loc.plotsAvailable} Plots Available</p>
                <span className="locality-card-link">
                  Explore Location &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

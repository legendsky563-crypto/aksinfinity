import Link from 'next/link';
import Image from 'next/image';
import { getProjects } from '@/lib/data';

export default async function PropertyDiscovery() {
  const projects = await Promise.resolve(getProjects());

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">OUR FLAGSHIP PORTFOLIO</span>
          <h2 className="heading-2">Explore by Project</h2>
          <p className="body-lg">
            Townships and gated communities developed and marketed by AKS Infinity, offering secured boundaries, planned infrastructure, and immediate registry.
          </p>
        </div>

        <div className="discovery-grid" style={{ gridTemplateRows: 'repeat(1, 360px)' }}>
          {projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.id} className="discovery-card">
              <Image 
                src={project.image} 
                alt={project.name} 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="discovery-card-overlay">
                <span className="eyebrow" style={{ color: 'var(--color-champagne-light)', marginBottom: '4px' }}>
                  {project.location}
                </span>
                <h3 className="discovery-card-title">{project.name}</h3>
                <p className="discovery-card-count">
                  {project.totalPlots} Total Plots • {project.priceRange}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <Link href="/projects" className="btn btn-secondary">
            Explore All Project Details
          </Link>
        </div>
      </div>
    </section>
  );
}

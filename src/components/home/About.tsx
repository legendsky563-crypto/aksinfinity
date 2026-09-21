import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';

export default function About() {
  const benefits = [
    'Land appreciates rapidly across NCR growth corridors',
    'It is a finite, high-demand tangible asset',
    'Zero waiting gap between purchase and immediate possession',
    'Initial investment threshold is significantly lower than built flats',
    'Lower annual property taxes with minimal holding overhead',
    'Zero ongoing maintenance costs or structural depreciation',
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="about-section">
          <div className="about-content">
            <span className="eyebrow">WHO WE ARE</span>
            <h2 className="heading-2">
              Your Dream,<br />Our Expertise.
            </h2>
            <p className="body-lg">
              Residential plots have always been the premier choice among astute investors and families seeking complete autonomy over their living spaces. AKS Infinity delivers an affordable yet high-yielding portfolio of registered plots across Greater Noida, Jewar, and the Yamuna Expressway.
            </p>
            <p className="body-lg" style={{ marginBottom: 'var(--space-6)' }}>
              Unlike mass apartments with shared maintenance and uniform templates, buying land gives you the total architectural freedom to build your custom residence while your asset steadily appreciates.
            </p>

            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h4 className="heading-4" style={{ marginBottom: 'var(--space-4)', color: 'var(--color-champagne)' }}>
                Key Advantages of Land Ownership:
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {benefits.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-base)', color: 'var(--color-graphite)' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      backgroundColor: 'rgba(201, 169, 110, 0.15)', 
                      color: 'var(--color-champagne)',
                      flexShrink: 0
                    }}>
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/projects" className="btn btn-secondary">
              Explore Our Projects &rarr;
            </Link>
          </div>

          <div className="about-image">
            <Image 
              src="/images/real/gallery5.jpg" 
              alt="AKS Infinity Real Plot Site Development" 
              width={700} 
              height={525} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

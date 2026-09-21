'use client';

import { useEffect, useRef, useState } from 'react';

export default function TrustStats() {
  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState({ plots: 0, projects: 0, years: 0, registry: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          const duration = 1600;
          const startTime = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              plots: Math.floor(easeOut * 500),
              projects: Math.floor(easeOut * 3),
              years: Math.floor(easeOut * 8),
              registry: Math.floor(easeOut * 100),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({ plots: 500, projects: 3, years: 8, registry: 100 });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  return (
    <section ref={sectionRef} className="trust-stats">
      <div className="container">
        <div className="trust-stats-grid">
          <div className="trust-stat">
            <div className="trust-stat-number">{counts.plots}+</div>
            <div className="trust-stat-label">Plots Sold Across NCR</div>
          </div>
          <div className="trust-stat">
            <div className="trust-stat-number">{counts.projects}</div>
            <div className="trust-stat-label">Active Flagship Projects</div>
          </div>
          <div className="trust-stat">
            <div className="trust-stat-number">{counts.years}+</div>
            <div className="trust-stat-label">Years of Advisory Trust</div>
          </div>
          <div className="trust-stat">
            <div className="trust-stat-number">{counts.registry}%</div>
            <div className="trust-stat-label">Registry & Title Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}

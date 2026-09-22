import Image from 'next/image';
import { Star } from 'lucide-react';
import testimonialsData from '@/data/testimonials.json';
import type { Testimonial } from '@/types';

export default function Testimonials() {
  const testimonials = (testimonialsData as Testimonial[]).slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow" style={{ color: 'var(--color-champagne)' }}>CLIENT EXPERIENCES</span>
          <h2 className="heading-2">What Our Clients Say</h2>
        </div>
        
        <div className="testimonials-grid" style={{ marginTop: 'var(--space-10)' }}>
          {testimonials.map((testimonial: Testimonial) => (
            <div 
              key={testimonial.id} 
              className="testimonial-card"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-mist)',
                padding: 'var(--space-8)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div className="flex gap-1 mb-4" style={{ display: 'flex', gap: '4px', marginBottom: 'var(--space-4)' }}>
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} size={18} fill="#D4AF37" color="#D4AF37" />
                ))}
              </div>
              <p className="body-md" style={{ fontStyle: 'italic', color: 'var(--color-graphite)', marginBottom: 'var(--space-6)', lineHeight: 1.7 }}>
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-4" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div className="w-12 h-12 relative rounded-full overflow-hidden bg-[var(--color-champagne)]/10 text-[var(--color-champagne)] flex items-center justify-center font-bold text-sm border border-[var(--color-champagne)]/30" style={{ width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0 }}>
                  {testimonial.image ? (
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                  ) : (
                    <span>
                      {testimonial.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, color: 'var(--color-charcoal)', fontSize: 'var(--text-base)' }}>{testimonial.name}</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-stone)' }}>{testimonial.role || testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

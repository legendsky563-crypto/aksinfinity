import Image from 'next/image';
import { Star } from 'lucide-react';
import testimonialsData from '@/data/testimonials.json';

export default function Testimonials() {
  const testimonials = testimonialsData.slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="heading-2">What Our Clients Say</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial: any) => (
            <div key={testimonial.id} className="testimonial-card bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="body-md italic text-gray-600 mb-6">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative rounded-full overflow-hidden bg-[var(--color-champagne)]/10 text-[var(--color-champagne)] flex items-center justify-center font-bold text-sm border border-[var(--color-champagne)]/30">
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
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role || testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="contact" className="final-cta">
      <div className="final-cta-bg">
        <Image 
          src="/images/real/gallery4.jpg" 
          alt="AKS Infinity Township Land" 
          fill 
          sizes="100vw"
        />
      </div>

      <div className="container">
        <div className="final-cta-content">
          <span className="eyebrow" style={{ color: 'var(--color-champagne)' }}>READY TO INVEST?</span>
          <h2 className="heading-1" style={{ color: 'var(--color-white)', marginTop: 'var(--space-4)' }}>
            Your Dream Plot<br />Is One Conversation Away.
          </h2>
          <p className="body-lg">
            Whether you are looking for an immediate registry plot in Holy Family Township, a spacious weekend farmhouse in Dudhola, or high-growth land near Jewar Airport — we are here to assist you.
          </p>

          <div className="final-cta-buttons">
            <Link href="/#contact" className="btn btn-primary btn-lg">
              Book a Site Visit
            </Link>
            <a 
              href="https://wa.me/918377077119?text=Hi%20AKS%20Infinity,%20I%20am%20interested%20in%20exploring%20plots" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp btn-lg"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

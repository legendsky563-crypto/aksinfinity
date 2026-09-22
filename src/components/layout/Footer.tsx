import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              AKS<span>Infinity</span>
            </Link>
            <p className="footer-desc">
              Your Dream, Our Expertise. Smart Investment, Secure Future. We offer an effective and affordable range of investments along with effective returns and appreciation.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/aksinfinity02/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100065019819256" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-links">
              <li><Link href="/plots" className="footer-link">Plots</Link></li>
              <li><Link href="/projects" className="footer-link">Projects</Link></li>
              <li><Link href="/gallery" className="footer-link">Gallery</Link></li>
              <li><Link href="/#map" className="footer-link">Map & Office</Link></li>
              <li><Link href="/#about" className="footer-link">About</Link></li>
              <li><Link href="/#contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Our Projects</h3>
            <ul className="footer-links">
              <li><Link href="/projects/holy-family-township" className="footer-link">Holy Family Township</Link></li>
              <li><Link href="/projects/dudhola-farm-house" className="footer-link">Dudhola Farm House</Link></li>
              <li><Link href="/projects/garhi-saamstipur-phase-3-1" className="footer-link">Garhi Saamstipur Phase-3-1</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <Phone size={18} />
                <span>+91 8368834467</span>
              </li>
              <li className="footer-contact-item">
                <Mail size={18} />
                <span>info@aksinfinity.com</span>
              </li>
              <li className="footer-contact-item" style={{ alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ marginTop: '4px' }} />
                <span>
                  Office No. 321, 3rd Floor,<br />
                  US Complex, Metro Station Jasola Apollo,<br />
                  Mathura Road, New Delhi 110076
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 AKS Infinity. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

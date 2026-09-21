'use client';

import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href?: string; dropdown?: { label: string; href: string }[] }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links }) => {
  if (!isOpen) return null;

  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
      <div className="mobile-menu-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, color: 'var(--color-charcoal)' }}>Theme</span>
          <ThemeToggle />
        </div>
        <button onClick={onClose} aria-label="Close menu" style={{ background: 'none', border: 'none', color: 'var(--color-charcoal)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <X size={28} />
        </button>
      </div>
      <div className="mobile-menu-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 90px)', overflowY: 'auto', padding: '1rem 0' }}>
        {links.map((link) => (
          <React.Fragment key={link.label}>
            {link.href ? (
              <Link 
                href={link.href} 
                className="mobile-menu-link"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ) : (
              <div style={{ margin: '0.75rem 0', textAlign: 'center', width: '100%' }}>
                <span className="mobile-menu-link" style={{ opacity: 0.7, fontSize: '1.25rem' }}>{link.label}</span>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem', gap: '0.4rem' }}>
                  {link.dropdown?.map(sub => (
                    <Link 
                      key={sub.label} 
                      href={sub.href}
                      className="mobile-menu-link"
                      style={{ fontSize: '1rem', opacity: 0.85 }}
                      onClick={onClose}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        
        <Link 
          href="/#contact" 
          className="btn btn-primary"
          onClick={onClose}
          style={{ marginTop: '1.5rem' }}
        >
          Book a Site Visit
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;

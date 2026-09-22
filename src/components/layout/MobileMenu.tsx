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
  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
      <div className="mobile-menu-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-champagne)' }}>Theme</span>
          <ThemeToggle />
        </div>
        <button 
          onClick={onClose} 
          aria-label="Close menu" 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'inherit', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(201, 169, 110, 0.1)',
          }}
        >
          <X size={24} />
        </button>
      </div>
      <div className="mobile-menu-inner">
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

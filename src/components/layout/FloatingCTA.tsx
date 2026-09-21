'use client';

import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

const FloatingCTA = () => {
  return (
    <div className="floating-cta">
      <a 
        href="https://wa.me/918377077119" 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-btn floating-btn-whatsapp"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
      
      <a 
        href="tel:+918368834467" 
        className="floating-btn floating-btn-call"
        aria-label="Call Us"
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default FloatingCTA;

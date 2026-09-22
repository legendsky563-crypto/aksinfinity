'use client';

import { useState } from 'react';

export default function EnquiryForm({ propertyName }: { propertyName?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyInterest: propertyName || '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setMessage('Thank you for your enquiry. We will get back to you soon!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          propertyInterest: propertyName || '',
          message: ''
        });
      } else {
        setStatus('error');
        setMessage('Failed to submit enquiry. Please try again later.');
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      {status === 'success' && (
        <div className="success-message p-3 mb-4 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}
      
      {status === 'error' && (
        <div className="error-message p-3 mb-4 bg-red-100 text-red-800 rounded">
          {message}
        </div>
      )}

      <div className="form-group margin-bottom-sm">
        <label htmlFor="name" className="display-block margin-bottom-xs">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group margin-bottom-sm">
        <label htmlFor="phone" className="display-block margin-bottom-xs">Phone *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-input w-full"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group margin-bottom-sm">
        <label htmlFor="email" className="display-block margin-bottom-xs">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input w-full"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group margin-bottom-sm">
        <label htmlFor="propertyInterest" className="display-block margin-bottom-xs">Property Interested In</label>
        <input
          type="text"
          id="propertyInterest"
          name="propertyInterest"
          className="form-input w-full"
          value={formData.propertyInterest}
          onChange={handleChange}
        />
      </div>

      <div className="form-group margin-bottom-md">
        <label htmlFor="message" className="display-block margin-bottom-xs">Message</label>
        <textarea
          id="message"
          name="message"
          className="form-textarea w-full h-24"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary w-full"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Enquiry'}
      </button>
    </form>
  );
}

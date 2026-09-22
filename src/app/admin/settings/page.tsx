'use client';

import React, { useState } from 'react';

export default function AdminSettings() {
  const [formData, setFormData] = useState({
    siteName: 'AKS Infinity',
    tagline: 'Premium Plots & Land Investments',
    phone: '+91 8368834467',
    whatsapp: '+91 8377077119',
    email: 'info@aksinfinity.com',
    address: 'Office No. 321, 3rd Floor, US Complex, Metro Station Jasola Apollo, Mathura Road, New Delhi 110076',
    instagram: 'https://www.instagram.com/aksinfinity02/',
    facebook: 'https://www.facebook.com/profile.php?id=100065019819256',
    linkedin: '',
    adminPassword: ''
  });

  // Since we don't have a settings API specified, this is mock functionality
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Settings</h1>
      </div>

      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="form-group">
              <label>Site Name</label>
              <input type="text" name="siteName" className="form-input" value={formData.siteName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Tagline</label>
              <input type="text" name="tagline" className="form-input" value={formData.tagline} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>WhatsApp</label>
              <input type="text" name="whatsapp" className="form-input" value={formData.whatsapp} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" className="form-input" value={formData.address} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Instagram URL</label>
              <input type="text" name="instagram" className="form-input" value={formData.instagram} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Facebook URL</label>
              <input type="text" name="facebook" className="form-input" value={formData.facebook} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>LinkedIn URL</label>
              <input type="text" name="linkedin" className="form-input" value={formData.linkedin} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Change Admin Password</label>
              <input type="password" name="adminPassword" className="form-input" placeholder="Leave blank to keep current" value={formData.adminPassword} onChange={handleChange} />
            </div>
          </div>
          
          <div className="admin-form-actions">
            <button type="submit" className="btn btn-primary">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

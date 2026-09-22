'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Property } from '@/types';

export default function AddProperty() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    project: 'Holy Family Township',
    price: '',
    priceLabel: '',
    pricePerSqYd: '',
    location: '',
    locality: 'Greater Noida',
    type: 'Residential Plot' as Property['type'],
    category: 'buy' as Property['category'],
    area: '',
    areaUnit: 'sq.yd.',
    dimensions: '',
    facing: 'East',
    roadWidth: '30 ft',
    registryStatus: 'Registry Ready' as Property['registryStatus'],
    developmentStatus: 'Fully Developed' as Property['developmentStatus'],
    possessionStatus: 'Immediate' as Property['possessionStatus'],
    status: 'Available' as Property['status'],
    featured: false,
    images: '',
    description: '',
    overview: '',
    amenities: '',
    nearbyPlaces: '',
    mapUrl: '',
    videoUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const processedData: Property = {
      id: `prop-${Date.now()}`,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      project: formData.project,
      price: Number(formData.price),
      priceLabel: formData.priceLabel || `₹${Number(formData.price).toLocaleString('en-IN')}`,
      pricePerSqYd: formData.pricePerSqYd,
      location: formData.location,
      locality: formData.locality,
      type: formData.type,
      category: formData.category,
      area: Number(formData.area),
      areaUnit: formData.areaUnit,
      dimensions: formData.dimensions,
      facing: formData.facing,
      roadWidth: formData.roadWidth,
      registryStatus: formData.registryStatus,
      developmentStatus: formData.developmentStatus,
      possessionStatus: formData.possessionStatus,
      status: formData.status,
      featured: formData.featured,
      images: formData.images.split(',').map(i => i.trim()).filter(Boolean),
      description: formData.description,
      overview: formData.overview,
      amenities: formData.amenities.split(',').map(i => i.trim()).filter(Boolean),
      nearbyPlaces: formData.nearbyPlaces.split(',').map(i => i.trim()).filter(Boolean),
      mapUrl: formData.mapUrl,
      videoUrl: formData.videoUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData)
      });
      if (res.ok) {
        router.push('/admin/properties');
      } else {
        alert('Failed to save property');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving property');
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Add Plot Property</h1>
      </div>

      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="form-group">
              <label>Plot Name *</label>
              <input type="text" name="name" className="form-input" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Project</label>
              <select name="project" className="form-input" value={formData.project} onChange={handleChange}>
                <option value="Holy Family Township">Holy Family Township</option>
                <option value="Dudhola Farm House">Dudhola Farm House</option>
                <option value="Garhi Samastipur Phase-3-1">Garhi Samastipur Phase-3-1</option>
                <option value="Yamuna Expressway Plots">Yamuna Expressway Plots</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price (₹) *</label>
              <input type="number" name="price" className="form-input" required value={formData.price} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Price Label (e.g. ₹28 Lakhs)</label>
              <input type="text" name="priceLabel" className="form-input" value={formData.priceLabel} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Price Per Sq.Yd. (e.g. ₹18,000 / sq.yd.)</label>
              <input type="text" name="pricePerSqYd" className="form-input" value={formData.pricePerSqYd} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input type="text" name="location" className="form-input" required value={formData.location} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Locality</label>
              <select name="locality" className="form-input" value={formData.locality} onChange={handleChange}>
                <option>Greater Noida</option>
                <option>Faridabad</option>
                <option>Palwal</option>
                <option>Yamuna Expressway</option>
                <option>Noida</option>
              </select>
            </div>
            <div className="form-group">
              <label>Plot Type</label>
              <select name="type" className="form-input" value={formData.type} onChange={handleChange}>
                <option value="Residential Plot">Residential Plot</option>
                <option value="Farmhouse Plot">Farmhouse Plot</option>
                <option value="Investment Plot">Investment Plot</option>
                <option value="Commercial Plot">Commercial Plot</option>
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" className="form-input" value={formData.category} onChange={handleChange}>
                <option value="buy">Buy</option>
                <option value="invest">Invest</option>
                <option value="resale">Resale</option>
              </select>
            </div>
            <div className="form-group">
              <label>Plot Area *</label>
              <input type="number" name="area" className="form-input" required value={formData.area} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Area Unit</label>
              <select name="areaUnit" className="form-input" value={formData.areaUnit} onChange={handleChange}>
                <option value="sq.yd.">sq.yd.</option>
                <option value="sq.m.">sq.m.</option>
                <option value="gaj">gaj</option>
              </select>
            </div>
            <div className="form-group">
              <label>Dimensions (e.g. 30x50 ft)</label>
              <input type="text" name="dimensions" className="form-input" value={formData.dimensions} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Facing</label>
              <select name="facing" className="form-input" value={formData.facing} onChange={handleChange}>
                <option value="East">East</option>
                <option value="North">North</option>
                <option value="West">West</option>
                <option value="South">South</option>
                <option value="Corner">Corner</option>
                <option value="North-East">North-East</option>
              </select>
            </div>
            <div className="form-group">
              <label>Front Road Width</label>
              <input type="text" name="roadWidth" className="form-input" value={formData.roadWidth} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Registry Status</label>
              <select name="registryStatus" className="form-input" value={formData.registryStatus} onChange={handleChange}>
                <option value="Registry Ready">Registry Ready</option>
                <option value="Registry Done">Registry Done</option>
                <option value="Agreement">Agreement</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="form-group">
              <label>Development Status</label>
              <select name="developmentStatus" className="form-input" value={formData.developmentStatus} onChange={handleChange}>
                <option value="Fully Developed">Fully Developed</option>
                <option value="Under Development">Under Development</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
            <div className="form-group">
              <label>Possession Status</label>
              <select name="possessionStatus" className="form-input" value={formData.possessionStatus} onChange={handleChange}>
                <option value="Immediate">Immediate</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
              </select>
            </div>
            <div className="form-group">
              <label>Availability Status</label>
              <select name="status" className="form-input" value={formData.status} onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Sold">Sold</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} style={{ marginRight: '0.5rem' }} />
                Featured Plot (show on homepage)
              </label>
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Image URLs (comma separated)</label>
              <input type="text" name="images" className="form-input" value={formData.images} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Short Overview</label>
              <input type="text" name="overview" className="form-input" value={formData.overview} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Description</label>
              <textarea name="description" className="form-input" rows={4} value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Nearby Infrastructure / Amenities (comma separated)</label>
              <input type="text" name="amenities" className="form-input" value={formData.amenities} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Nearby Places (comma separated)</label>
              <input type="text" name="nearbyPlaces" className="form-input" value={formData.nearbyPlaces} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Map Embed / Location URL</label>
              <input type="text" name="mapUrl" className="form-input" value={formData.mapUrl} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Video Tour URL</label>
              <input type="text" name="videoUrl" className="form-input" value={formData.videoUrl} onChange={handleChange} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary">Save Plot Property</button>
            <Link href="/admin/properties" className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

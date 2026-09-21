'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProperty() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    location: '',
    locality: 'Gurugram',
    type: 'Apartment',
    category: 'buy',
    bhk: '',
    bathrooms: '',
    area: '',
    areaUnit: 'sq.ft.',
    parking: '',
    status: 'Available',
    featured: false,
    images: '',
    description: '',
    overview: '',
    amenities: '',
    nearbyPlaces: '',
    mapUrl: '',
    videoUrl: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties`);
        const properties = await res.json();
        const p = properties.find((prop: any) => prop.id === id);
        
        if (p) {
          setFormData({
            id: p.id,
            name: p.name || '',
            price: p.price?.toString() || '',
            location: p.location || '',
            locality: p.locality || 'Gurugram',
            type: p.type || 'Apartment',
            category: p.category || 'buy',
            bhk: p.bhk?.toString() || '',
            bathrooms: p.bathrooms?.toString() || '',
            area: p.area?.toString() || '',
            areaUnit: p.areaUnit || 'sq.ft.',
            parking: p.parking?.toString() || '',
            status: p.status || 'Available',
            featured: p.featured || false,
            images: p.images ? p.images.join(', ') : '',
            description: p.description || '',
            overview: p.overview || '',
            amenities: p.amenities ? p.amenities.join(', ') : '',
            nearbyPlaces: p.nearbyPlaces ? p.nearbyPlaces.map((np: any) => `${np.name}|${np.distance}`).join(', ') : '',
            mapUrl: p.mapUrl || '',
            videoUrl: p.videoUrl || ''
          });
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process string lists
    const processedData = {
      ...formData,
      price: Number(formData.price),
      bhk: formData.bhk ? Number(formData.bhk) : undefined,
      bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
      area: Number(formData.area),
      parking: formData.parking ? Number(formData.parking) : undefined,
      images: formData.images.split(',').map(i => i.trim()).filter(Boolean),
      amenities: formData.amenities.split(',').map(i => i.trim()).filter(Boolean),
      nearbyPlaces: formData.nearbyPlaces.split(',').map(i => {
        const parts = i.split('|');
        if (parts.length === 2) {
          return { name: parts[0].trim(), distance: parts[1].trim() };
        }
        return { name: i.trim(), distance: '' };
      }).filter(p => p.name)
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
        alert('Failed to update property');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating property');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit Property</h1>
      </div>

      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="form-group">
              <label>Property Name *</label>
              <input type="text" name="name" className="form-input" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Price *</label>
              <input type="number" name="price" className="form-input" required value={formData.price} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input type="text" name="location" className="form-input" required value={formData.location} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Locality</label>
              <select name="locality" className="form-input" value={formData.locality} onChange={handleChange}>
                <option>Gurugram</option>
                <option>Noida</option>
                <option>South Delhi</option>
                <option>Faridabad</option>
                <option>Greater Noida</option>
                <option>Delhi NCR</option>
              </select>
            </div>
            <div className="form-group">
              <label>Property Type</label>
              <select name="type" className="form-input" value={formData.type} onChange={handleChange}>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot</option>
                <option>Commercial</option>
                <option>Penthouse</option>
                <option>Independent House</option>
                <option>Studio</option>
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" className="form-input" value={formData.category} onChange={handleChange}>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
              </select>
            </div>
            <div className="form-group">
              <label>BHK</label>
              <input type="number" name="bhk" className="form-input" value={formData.bhk} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Bathrooms</label>
              <input type="number" name="bathrooms" className="form-input" value={formData.bathrooms} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Area *</label>
              <input type="number" name="area" className="form-input" required value={formData.area} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Area Unit</label>
              <select name="areaUnit" className="form-input" value={formData.areaUnit} onChange={handleChange}>
                <option>sq.ft.</option>
                <option>sq.yd.</option>
                <option>sq.m.</option>
              </select>
            </div>
            <div className="form-group">
              <label>Parking</label>
              <input type="number" name="parking" className="form-input" value={formData.parking} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" className="form-input" value={formData.status} onChange={handleChange}>
                <option>Available</option>
                <option>Sold</option>
                <option>Rented</option>
                <option>Coming Soon</option>
              </select>
            </div>
            
            <div className="form-group admin-form-full">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                Featured Property
              </label>
            </div>

            <div className="form-group admin-form-full">
              <label>Images (comma separated URLs)</label>
              <input type="text" name="images" className="form-input" value={formData.images} onChange={handleChange} />
            </div>
            
            <div className="form-group admin-form-full">
              <label>Description</label>
              <textarea name="description" className="form-textarea" rows={3} value={formData.description} onChange={handleChange} />
            </div>
            
            <div className="form-group admin-form-full">
              <label>Overview</label>
              <textarea name="overview" className="form-textarea" rows={4} value={formData.overview} onChange={handleChange} />
            </div>
            
            <div className="form-group admin-form-full">
              <label>Amenities (comma separated)</label>
              <input type="text" name="amenities" className="form-input" value={formData.amenities} onChange={handleChange} />
            </div>

            <div className="form-group admin-form-full">
              <label>Nearby Places (Format: Name|Distance, Name|Distance)</label>
              <input type="text" name="nearbyPlaces" className="form-input" value={formData.nearbyPlaces} onChange={handleChange} />
            </div>

            <div className="form-group admin-form-full">
              <label>Map URL (Google Maps embed link)</label>
              <input type="text" name="mapUrl" className="form-input" value={formData.mapUrl} onChange={handleChange} />
            </div>
            
            <div className="form-group admin-form-full">
              <label>Video URL (YouTube embed link)</label>
              <input type="text" name="videoUrl" className="form-input" value={formData.videoUrl} onChange={handleChange} />
            </div>
          </div>
          
          <div className="admin-form-actions">
            <Link href="/admin/properties" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Update Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

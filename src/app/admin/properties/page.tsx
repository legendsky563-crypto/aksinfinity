'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types';

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await fetch(`/api/properties?id=${id}`, { method: 'DELETE' });
        setProperties(properties.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const filtered = properties.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Properties</h1>
        <Link href="/admin/properties/new" className="btn btn-primary">
          Add Property
        </Link>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search properties..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Location</th>
              <th>Price</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6}>Loading...</td></tr>
            ) : filtered.map(p => (
              <tr key={p.id}>
                <td>{p.name} {p.featured && <span style={{color: 'var(--brand-gold)', marginLeft: '0.5rem'}}>★</span>}</td>
                <td>{p.locality}, {p.location}</td>
                <td>₹{p.price.toLocaleString()}</td>
                <td>{p.type}</td>
                <td>
                  <span className={`status-badge status-${p.status?.toLowerCase().replace(' ', '-') || 'available'}`}>
                    {p.status || 'Available'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link href={`/admin/properties/${p.id}/edit`} className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="btn btn-secondary" 
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderColor: 'red', color: 'red' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center' }}>No properties found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

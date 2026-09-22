'use client';

import React, { useEffect, useState } from 'react';
import { Testimonial } from '@/types';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Delete this testimonial?')) {
      try {
        await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
        setTestimonials(testimonials.filter(t => t.id !== id));
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Testimonials</h1>
        <button className="btn btn-primary">Add Testimonial</button>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Text</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4}>Loading...</td></tr>
            ) : testimonials.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.location || '-'}</td>
                <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {t.text}
                </td>
                <td>
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="btn btn-secondary" 
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderColor: 'red', color: 'red' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!loading && testimonials.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>No testimonials found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

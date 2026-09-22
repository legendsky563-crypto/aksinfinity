'use client';

import React, { useEffect, useState } from 'react';
import { Enquiry } from '@/types';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiries');
      const data: Enquiry[] = await res.json();
      // sort by date desc
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: Enquiry['status']) => {
    try {
      const enq = enquiries.find(e => e.id === id);
      if (!enq) return;
      
      const res = await fetch('/api/enquiries', {
        method: 'POST', // or PUT depending on API
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...enq, status: newStatus })
      });
      
      if (res.ok) {
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this enquiry?')) {
      try {
        await fetch(`/api/enquiries?id=${id}`, { method: 'DELETE' });
        setEnquiries(enquiries.filter(e => e.id !== id));
      } catch (error) {
        console.error('Error deleting enquiry:', error);
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Enquiries</h1>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Property</th>
              <th>Message</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : enquiries.map(e => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                  <div>{e.phone}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{e.email}</div>
                </td>
                <td>{e.propertyInterested || '-'}</td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={e.message}>
                  {e.message}
                </td>
                <td>
                  <select 
                    value={e.status} 
                    onChange={(evt) => updateStatus(e.id, evt.target.value as Enquiry['status'])}
                    className={`status-badge status-${e.status}`}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td>{e.createdAt ? new Date(e.createdAt).toLocaleDateString() : '-'}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(e.id)}
                    className="btn btn-secondary" 
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderColor: 'red', color: 'red' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!loading && enquiries.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center' }}>No enquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

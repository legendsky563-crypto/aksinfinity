'use client';

import React, { useEffect, useState } from 'react';
import { Property, Enquiry } from '@/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    featuredProperties: 0,
    totalEnquiries: 0,
    newEnquiries: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [propsRes, enqRes] = await Promise.all([
          fetch('/api/properties'),
          fetch('/api/enquiries')
        ]);
        
        const properties: Property[] = await propsRes.json();
        const enquiries: Enquiry[] = await enqRes.json();

        setStats({
          totalProperties: properties.length,
          featuredProperties: properties.filter(p => p.featured).length,
          totalEnquiries: enquiries.length,
          newEnquiries: enquiries.filter(e => e.status === 'new').length
        });

        // Sort by date desc
        const sorted = [...enquiries].sort((a, b) => {
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        });
        setRecentEnquiries(sorted.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Dashboard</h1>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="body-sm" style={{ color: 'var(--text-secondary)' }}>Total Properties</div>
          <div className="heading-3">{stats.totalProperties}</div>
        </div>
        <div className="admin-stat-card">
          <div className="body-sm" style={{ color: 'var(--text-secondary)' }}>Featured Properties</div>
          <div className="heading-3">{stats.featuredProperties}</div>
        </div>
        <div className="admin-stat-card">
          <div className="body-sm" style={{ color: 'var(--text-secondary)' }}>Total Enquiries</div>
          <div className="heading-3">{stats.totalEnquiries}</div>
        </div>
        <div className="admin-stat-card">
          <div className="body-sm" style={{ color: 'var(--text-secondary)' }}>New Enquiries</div>
          <div className="heading-3">{stats.newEnquiries}</div>
        </div>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h2 className="admin-table-title">Recent Enquiries</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Property</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentEnquiries.map(enq => (
              <tr key={enq.id}>
                <td>{enq.name}</td>
                <td>{enq.phone}</td>
                <td>{enq.propertyInterested || '-'}</td>
                <td>
                  <span className={`status-badge status-${enq.status}`}>
                    {enq.status}
                  </span>
                </td>
                <td>
                  {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : '-'}
                </td>
              </tr>
            ))}
            {recentEnquiries.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>No recent enquiries</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

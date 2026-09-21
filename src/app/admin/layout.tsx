'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    setIsAuthenticated(auth === 'true');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  if (isAuthenticated === null) {
    return null; // Loading
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <h3 className="heading-3">AKS Infinity</h3>
          <p className="body-sm" style={{ marginBottom: '2rem' }}>Enter password to access dashboard</p>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="password" 
                className="form-input" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {error && <p className="body-sm" style={{ color: 'red', marginTop: '0.5rem', marginBottom: '1rem' }}>{error}</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

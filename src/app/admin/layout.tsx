'use client';

import React, { useState, useSyncExternalStore } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

function getAuthSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('admin_auth') === 'true';
}

function getServerAuthSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthStore = useSyncExternalStore(subscribe, getAuthSnapshot, getServerAuthSnapshot);
  const [localAuth, setLocalAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isAuthenticated = isAuthStore || localAuth;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('admin_auth', 'true');
      setLocalAuth(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

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

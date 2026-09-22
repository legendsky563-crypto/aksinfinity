'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';

function getThemeSnapshot(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getServerThemeSnapshot(): 'light' | 'dark' {
  return 'light';
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export default function ThemeToggle() {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const theme = React.useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.dispatchEvent(new Event('storage'));
  };

  if (!mounted) {
    return (
      <button 
        type="button" 
        className="theme-toggle-btn" 
        aria-label="Toggle dark mode"
        style={{ width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 }}
      >
        <span style={{ width: '18px', height: '18px' }} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun size={18} className="theme-icon theme-icon-sun" />
      ) : (
        <Moon size={18} className="theme-icon theme-icon-moon" />
      )}
    </button>
  );
}

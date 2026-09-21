'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Plus, 
  Mail, 
  MessageSquare, 
  Settings, 
  ArrowLeft 
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <Link href="/admin">
          AKS<span>Infinity</span>
        </Link>
      </div>

      <nav className="admin-nav">
        <Link 
          href="/admin" 
          className={`admin-nav-link ${isActive('/admin') ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link 
          href="/admin/properties" 
          className={`admin-nav-link ${isActive('/admin/properties') ? 'active' : ''}`}
        >
          <Building2 size={20} />
          Properties
        </Link>
        <Link 
          href="/admin/properties/new" 
          className={`admin-nav-link ${pathname === '/admin/properties/new' ? 'active' : ''}`}
        >
          <Plus size={20} />
          Add Property
        </Link>
        <Link 
          href="/admin/enquiries" 
          className={`admin-nav-link ${isActive('/admin/enquiries') ? 'active' : ''}`}
        >
          <Mail size={20} />
          Enquiries
        </Link>
        <Link 
          href="/admin/testimonials" 
          className={`admin-nav-link ${isActive('/admin/testimonials') ? 'active' : ''}`}
        >
          <MessageSquare size={20} />
          Testimonials
        </Link>
        <Link 
          href="/admin/settings" 
          className={`admin-nav-link ${isActive('/admin/settings') ? 'active' : ''}`}
        >
          <Settings size={20} />
          Settings
        </Link>
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <Link 
            href="/" 
            className="admin-nav-link"
          >
            <ArrowLeft size={20} />
            Back to Site
          </Link>
        </div>
      </nav>
    </aside>
  );
}

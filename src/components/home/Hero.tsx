'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Layers, Compass, IndianRupee } from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [project, setProject] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (project) params.append('project', project);
    if (location) params.append('locality', location);
    if (type) params.append('type', type);
    if (budget) params.append('budget', budget);
    
    router.push(`/plots?${params.toString()}`);
  };

  return (
    <div className="hero">
      <div className="hero-bg">
        <Image 
          src="/images/real/gallery4.jpg" 
          alt="AKS Infinity Plotted Township Development" 
          fill 
          priority 
          sizes="100vw"
        />
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-eyebrow">PREMIUM PLOTS • GREATER NOIDA, JEWAR & YAMUNA EXPRESSWAY</span>
        <h1 className="hero-title">
          Invest in Land.<br />Build Your Future.
        </h1>
        <p className="hero-subtitle">
          Discover prime residential, farmhouse and strategic investment plots in Greater Noida, near Jewar International Airport and Yamuna Expressway.
        </p>

        <div className="hero-buttons">
          <Link href="/plots" className="btn btn-primary btn-lg">
            Explore Plots
          </Link>
          <Link href="/#contact" className="btn btn-outline-light btn-lg">
            Book a Site Visit
          </Link>
        </div>
      </div>

      <div className="search-panel">
        <form className="search-panel-inner" onSubmit={handleSearch}>
          <div className="search-field">
            <label htmlFor="search-project">
              <Layers size={13} /> Project
            </label>
            <select id="search-project" value={project} onChange={(e) => setProject(e.target.value)}>
              <option value="">All Projects</option>
              <option value="Holy Family Township">Holy Family Township</option>
              <option value="Dudhola Farm House">Dudhola Farm House</option>
              <option value="Garhi Saamstipur Phase-3-1">Garhi Saamstipur Phase-3-1</option>
            </select>
          </div>

          <div className="search-field">
            <label htmlFor="search-location">
              <MapPin size={13} /> Location
            </label>
            <select id="search-location" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">All Locations</option>
              <option value="Greater Noida">Greater Noida</option>
              <option value="Jewar">Jewar</option>
              <option value="Yamuna Expressway">Yamuna Expressway</option>
              <option value="Dudhola">Dudhola</option>
              <option value="Noida">Noida</option>
            </select>
          </div>

          <div className="search-field">
            <label htmlFor="search-type">
              <Compass size={13} /> Plot Type
            </label>
            <select id="search-type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Types</option>
              <option value="Residential Plot">Residential Plot</option>
              <option value="Investment Plot">Investment Plot</option>
              <option value="Farmhouse Plot">Farmhouse Plot</option>
              <option value="Commercial Plot">Commercial Plot</option>
            </select>
          </div>

          <div className="search-field">
            <label htmlFor="search-budget">
              <IndianRupee size={13} /> Budget
            </label>
            <select id="search-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">Any Budget</option>
              <option value="Under ₹10 Lakh">Under ₹10 Lakh</option>
              <option value="₹10-25 Lakh">₹10-25 Lakh</option>
              <option value="₹25-50 Lakh">₹25-50 Lakh</option>
              <option value="₹50 Lakh-1 Cr">₹50 Lakh-1 Cr</option>
              <option value="₹1 Cr+">₹1 Cr+</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary search-btn">
            <Search size={16} /> Search Plots
          </button>
        </form>
      </div>
    </div>
  );
}

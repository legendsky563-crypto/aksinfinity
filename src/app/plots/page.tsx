'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/types';
import { MapPin } from 'lucide-react';

function PlotsContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [project, setProject] = useState(searchParams.get('project') || '');
  const [location, setLocation] = useState(searchParams.get('locality') || searchParams.get('location') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [plotSize, setPlotSize] = useState(searchParams.get('size') || '');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch('/api/properties');
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error('Failed to fetch plots:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  useEffect(() => {
    let result = [...properties];

    if (project) {
      result = result.filter(p => p.name.toLowerCase().includes(project.toLowerCase()) || (p.project && p.project.toLowerCase() === project.toLowerCase()));
    }
    if (location) {
      result = result.filter(p => p.locality.toLowerCase().includes(location.toLowerCase()) || p.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (type) {
      result = result.filter(p => p.type.toLowerCase() === type.toLowerCase() || p.category.toLowerCase() === type.toLowerCase());
    }
    if (plotSize) {
      result = result.filter(p => {
        const area = p.area;
        if (plotSize === 'under-100') return area < 100;
        if (plotSize === '100-200') return area >= 100 && area <= 200;
        if (plotSize === '200-500') return area >= 200 && area <= 500;
        if (plotSize === '500+') return area > 500;
        return true;
      });
    }

    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    }

    setFilteredProperties(result);
  }, [properties, project, location, type, plotSize, sort]);

  return (
    <div>
      <section className="listing-hero">
        <div className="container">
          <h1 className="heading-1">Explore Plots</h1>
          <p className="body-lg">Discover our exclusive collection of premium residential and commercial plots.</p>
        </div>
      </section>

      <div className="container">
        <div className="filters-bar">
          <div className="filters-inner">
            <select className="filter-select" value={project} onChange={e => setProject(e.target.value)}>
              <option value="">All Projects</option>
              <option value="Holy Family Township">Holy Family Township</option>
              <option value="Dudhola Farm House">Dudhola Farm House</option>
              <option value="Garhi Saamstipur">Garhi Saamstipur</option>
            </select>

            <select className="filter-select" value={location} onChange={e => setLocation(e.target.value)}>
              <option value="">All Locations</option>
              <option value="Greater Noida">Greater Noida</option>
              <option value="Jewar">Jewar</option>
              <option value="Yamuna Expressway">Yamuna Expressway</option>
              <option value="Greater Noida West">Greater Noida West</option>
              <option value="Noida">Noida</option>
            </select>

            <select className="filter-select" value={type} onChange={e => setType(e.target.value)}>
              <option value="">Plot Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Industrial">Industrial</option>
            </select>

            <select className="filter-select" value={plotSize} onChange={e => setPlotSize(e.target.value)}>
              <option value="">Plot Size</option>
              <option value="under-100">Under 100 sq.yd.</option>
              <option value="100-200">100 - 200 sq.yd.</option>
              <option value="200-500">200 - 500 sq.yd.</option>
              <option value="500+">500+ sq.yd.</option>
            </select>

            <select className="filter-select sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low">Price — Low to High</option>
              <option value="price-high">Price — High to Low</option>
            </select>
          </div>
        </div>

        <div className="section">
          <p className="listing-results">
            Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'plot' : 'plots'}
          </p>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>Loading plots...</div>
          ) : (
            <div className="property-grid">
              {filteredProperties.map(property => (
                <Link key={property.id} href={`/plots/${property.slug}`} className="property-card">
                  <div className="property-card-image">
                    <Image
                      src={property.images[0] || '/images/real/gallery4.jpg'}
                      alt={property.name}
                      width={600}
                      height={450}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span className="property-card-badge">{property.type || 'Plot'}</span>
                    {property.featured && (
                      <span className="property-card-status available">Featured</span>
                    )}
                  </div>
                  <div className="property-card-body">
                    <span className="property-card-type">{property.project || 'Independent Plot'}</span>
                    <h3 className="property-card-name">{property.name}</h3>
                    <p className="property-card-location">
                      <MapPin size={14} /> {property.location}
                    </p>
                    <div className="property-card-price">{property.priceLabel}</div>
                    <div className="property-card-specs">
                      <span className="property-card-spec">{property.area.toLocaleString('en-IN')} {property.areaUnit || 'sq.yd.'}</span>
                      {property.facing && <span className="property-card-spec">{property.facing} Facing</span>}
                    </div>
                    <span className="property-card-cta">View Plot</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredProperties.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
              <p className="body-lg">No plots found matching your criteria.</p>
              <button className="btn btn-secondary" style={{ marginTop: 'var(--space-4)' }} onClick={() => {
                setProject('');
                setLocation('');
                setType('');
                setPlotSize('');
                setSort('newest');
              }}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PlotsPage() {
  return (
    <Suspense fallback={<div className="container section" style={{ textAlign: 'center' }}>Loading...</div>}>
      <PlotsContent />
    </Suspense>
  );
}

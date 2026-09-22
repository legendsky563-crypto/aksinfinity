export interface Property {
  id: string;
  name: string;
  slug: string;
  project: string; // Holy Family Township, Dudhola Farm House, Garhi Saamstipur Phase-3-1
  type: 'Residential Plot' | 'Farmhouse Plot' | 'Investment Plot' | 'Commercial Plot';
  category: 'buy' | 'invest' | 'resale';
  price: number;
  priceLabel: string;
  pricePerSqYd?: string;
  area: number;
  areaUnit: string; // sq.yd., sq.m., gaj
  dimensions?: string; // e.g. "30x40", "40x60"
  facing?: string; // East, West, North, South, Corner
  roadWidth?: string; // e.g. "30 ft", "40 ft", "60 ft"
  location: string;
  locality: string;
  status: 'Available' | 'Sold' | 'Booked' | 'Coming Soon';
  registryStatus: 'Registry Ready' | 'Registry Done' | 'Agreement' | 'Pending';
  developmentStatus: 'Fully Developed' | 'Under Development' | 'Upcoming';
  possessionStatus: 'Immediate' | '3 Months' | '6 Months' | '1 Year';
  featured: boolean;
  images: string[];
  description: string;
  overview: string;
  amenities: string[]; // Nearby amenities: School, Hospital, Market etc.
  nearbyPlaces: string[];
  mapUrl?: string;
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  image: string;
  plotsAvailable: number;
  plotsSold: number;
  totalPlots: number;
  priceRange: string;
  areaRange: string;
  status: 'Active' | 'Upcoming' | 'Sold Out';
  highlights: string[];
  nearbyInfra: string[];
  mapImage?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterested: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  role?: string;
  rating?: number;
  image?: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  plotsAvailable: number;
}

export interface Settings {
  siteName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  linkedin: string;
}

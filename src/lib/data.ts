import fs from 'fs';
import path from 'path';
import { Property, Testimonial, Enquiry, Location, Settings, Project } from '@/types';

const dataDir = path.join(process.cwd(), 'src', 'data');

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Properties
export function getProperties(): Property[] {
  return readJSON<Property[]>('properties.json');
}

export function getPropertyBySlug(slug: string): Property | undefined {
  const properties = getProperties();
  return properties.find(p => p.slug === slug);
}

export function getPropertyById(id: string): Property | undefined {
  const properties = getProperties();
  return properties.find(p => p.id === id);
}

export function getFeaturedProperties(): Property[] {
  const properties = getProperties();
  return properties.filter(p => p.featured);
}

export function getPropertiesByLocality(locality: string): Property[] {
  const properties = getProperties();
  return properties.filter(p => p.locality.toLowerCase() === locality.toLowerCase());
}

export function saveProperty(property: Property): void {
  const properties = getProperties();
  const index = properties.findIndex(p => p.id === property.id);
  if (index >= 0) {
    properties[index] = property;
  } else {
    properties.push(property);
  }
  writeJSON('properties.json', properties);
}

export function deleteProperty(id: string): void {
  const properties = getProperties().filter(p => p.id !== id);
  writeJSON('properties.json', properties);
}

// Projects
export function getProjects(): Project[] {
  try {
    return readJSON<Project[]>('projects.json');
  } catch (error) {
    return [];
  }
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find(p => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  const projects = getProjects();
  return projects.find(p => p.id === id);
}

// Testimonials
export function getTestimonials(): Testimonial[] {
  return readJSON<Testimonial[]>('testimonials.json');
}

export function saveTestimonial(testimonial: Testimonial): void {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === testimonial.id);
  if (index >= 0) {
    testimonials[index] = testimonial;
  } else {
    testimonials.push(testimonial);
  }
  writeJSON('testimonials.json', testimonials);
}

export function deleteTestimonial(id: string): void {
  const testimonials = getTestimonials().filter(t => t.id !== id);
  writeJSON('testimonials.json', testimonials);
}

// Enquiries
export function getEnquiries(): Enquiry[] {
  return readJSON<Enquiry[]>('enquiries.json');
}

export function saveEnquiry(enquiry: Enquiry): void {
  const enquiries = getEnquiries();
  const index = enquiries.findIndex(e => e.id === enquiry.id);
  if (index >= 0) {
    enquiries[index] = enquiry;
  } else {
    enquiries.push(enquiry);
  }
  writeJSON('enquiries.json', enquiries);
}

export function deleteEnquiry(id: string): void {
  const enquiries = getEnquiries().filter(e => e.id !== id);
  writeJSON('enquiries.json', enquiries);
}

// Locations
export function getLocations(): Location[] {
  return readJSON<Location[]>('locations.json');
}

// Settings
export function getSettings(): Settings {
  return readJSON<Settings>('settings.json');
}

export function saveSettings(settings: Settings): void {
  writeJSON('settings.json', settings);
}

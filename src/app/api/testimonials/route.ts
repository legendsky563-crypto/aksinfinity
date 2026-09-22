import { NextResponse } from 'next/server';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@/lib/data';
import type { Testimonial } from '@/types';

export async function GET() {
  try {
    const testimonials = getTestimonials();
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const testimonial: Testimonial = {
      ...body,
      id: body.id || `test-${Date.now()}`,
      createdAt: body.createdAt || new Date().toISOString(),
    };
    
    saveTestimonial(testimonial);
    return NextResponse.json({ message: 'Testimonial saved successfully', testimonial }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
    }
    
    deleteTestimonial(id);
    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}

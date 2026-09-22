import { NextResponse } from 'next/server';
import { getEnquiries, saveEnquiry } from '@/lib/data';
import type { Enquiry } from '@/types';

export async function GET() {
  try {
    const enquiries = getEnquiries();
    return NextResponse.json(enquiries);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const enquiry: Enquiry = {
      ...body,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    
    saveEnquiry(enquiry);
    return NextResponse.json({ message: 'Enquiry saved successfully', enquiry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });
    }
    
    const enquiries = getEnquiries();
    const existingIndex = enquiries.findIndex(e => e.id === body.id);
    
    if (existingIndex >= 0) {
      const updatedEnquiry = { ...enquiries[existingIndex], ...body, updatedAt: new Date().toISOString() };
      saveEnquiry(updatedEnquiry);
      return NextResponse.json({ message: 'Enquiry updated successfully', enquiry: updatedEnquiry });
    } else {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

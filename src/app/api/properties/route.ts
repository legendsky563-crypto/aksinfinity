import { NextResponse } from 'next/server';
import { getProperties, saveProperty, deleteProperty } from '@/lib/data';
import type { Property } from '@/types';

export async function GET() {
  try {
    const properties = getProperties();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const property: Property = {
      ...body,
      id: body.id || `prop-${Date.now()}`,
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    saveProperty(property);
    return NextResponse.json({ message: 'Property saved successfully', property }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save property' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
    }
    
    deleteProperty(id);
    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}

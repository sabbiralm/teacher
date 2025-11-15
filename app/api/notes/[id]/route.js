import { connectDB } from '@/lib/db';
import Note from '@/models/Note';
import { NextResponse } from 'next/server';

// GET single note
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const note = await Note.findById(params.id);
    
    if (!note) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: note });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update note
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();
    const note = await Note.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!note) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: note });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE note
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const note = await Note.findByIdAndDelete(params.id);
    
    if (!note) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
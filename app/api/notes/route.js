import { connectDB } from '@/lib/db';
import Note from '@/models/Note';
import { NextResponse } from 'next/server';

// GET all notes with optimized query
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'all';
    const sortBy = searchParams.get('sortBy') || 'updatedAt';
    
    // Build query more efficiently
    let query = {};
    
    if (category !== 'all') {
      query.category = category;
    }
    
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { content: { $regex: searchTerm, $options: 'i' } }
      ];
      // Tags search only if needed
      if (!searchTerm.includes(' ')) {
        query.$or.push({ tags: { $in: [new RegExp(searchTerm, 'i')] } });
      }
    }
    
    // Build sort
    let sortOptions = { isPinned: -1 };
    switch (sortBy) {
      case 'title':
        sortOptions.title = 1;
        break;
      case 'wordCount':
        sortOptions.wordCount = -1;
        break;
      default:
        sortOptions.updatedAt = -1;
    }
    
    const notes = await Note.find(query)
      .sort(sortOptions)
      .select('-__v') // Remove unnecessary fields
      .lean(); // Faster response
    
    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

// POST create new note
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const note = await Note.create(body);
    
    return NextResponse.json({ 
      success: true, 
      data: note,
      message: 'নোট সফলভাবে তৈরি হয়েছে'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { success: false, error: 'নোট তৈরি করতে সমস্যা হয়েছে' },
      { status: 400 }
    );
  }
}
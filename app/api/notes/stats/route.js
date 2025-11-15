import { connectDB } from '@/lib/db';
import Note from '@/models/Note';
import { NextResponse } from 'next/server';

// GET category counts and statistics
export async function GET() {
  try {
    await connectDB();
    
    // Get category counts in single query
    const categoryStats = await Note.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Convert to more usable format
    const categoryCounts = {};
    categoryStats.forEach(stat => {
      categoryCounts[stat._id] = stat.count;
    });
    
    // Get total stats
    const totalNotes = await Note.countDocuments();
    const pinnedNotes = await Note.countDocuments({ isPinned: true });
    const totalWordCount = await Note.aggregate([
      {
        $group: {
          _id: null,
          totalWords: { $sum: '$wordCount' }
        }
      }
    ]);
    
    const avgWordCount = totalNotes > 0 ? 
      Math.round(totalWordCount[0]?.totalWords / totalNotes) : 0;
    
    return NextResponse.json({
      success: true,
      data: {
        categoryCounts,
        totalNotes,
        pinnedNotes,
        avgWordCount
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
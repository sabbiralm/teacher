import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Post from '@/models/Post';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;

    const post = await Post.findById(id)
      .populate('author', 'name role avatar subject class')
      .lean();

    if (!post || post.isDeleted) {
      return NextResponse.json(
        { success: false, error: 'পোস্ট পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post: {
        ...post,
        timestamp: new Date(post.createdAt).toLocaleString('bn-BD'),
        likes: post.likesCount,
        comments: post.commentsCount,
        shares: post.sharesCount
      }
    });

  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: 'পোস্ট লোড করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
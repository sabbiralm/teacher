import { connectDB } from '@/lib/db';
import Post from '@/models/Post';

export async function POST(request, { params }) {
  try {
    await connectDB();
    const { userId } = await request.json();
    const postId = params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    const hasLiked = post.likes.includes(userId);
    
    if (hasLiked) {
      // Unlike
      post.likes = post.likes.filter(like => like.toString() !== userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    return Response.json({ 
      likes: post.likes.length,
      hasLiked: !hasLiked
    });
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
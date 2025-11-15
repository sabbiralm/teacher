import { connectDB } from '@/lib/db';
import Post from '@/models/Post';
import User from '@/models/User';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    const posts = await Post.find(query)
      .populate('author', 'name role') // author populate করুন
      .sort({ createdAt: -1 });

    return Response.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { title, content, category, authorId } = await request.json();

    // Check if user exists
    const user = await User.findById(authorId);
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.role === 'student' && !['problem', 'new_idea', 'general'].includes(category)) {
      return Response.json({ error: 'Students can only post in problem, new_idea, or general categories' }, { status: 403 });
    }

    const post = new Post({
      title,
      content,
      category,
      author: authorId
    });

    await post.save();
    
    // Populate author data before sending response
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name role');

    return Response.json(populatedPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
import { connectDB } from '@/lib/db';
import Comment from '@/models/Comment';
import Post from '@/models/Post';

export async function POST(request) {
  try {
    await connectDB();
    const { content, authorId, postId, parentCommentId } = await request.json();

    const comment = new Comment({
      content,
      author: authorId,
      post: postId,
      parentComment: parentCommentId || null
    });

    await comment.save();

    // If it's a reply, add to parent comment's replies
    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: comment._id }
      });
    }

    await comment.populate('author', 'name role');
    await comment.populate('replies');

    return Response.json(comment, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    const comments = await Comment.find({ 
      post: postId,
      parentComment: null 
    })
      .populate('author', 'name role')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'name role'
        }
      })
      .sort({ createdAt: 1 });

    return Response.json(comments);
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
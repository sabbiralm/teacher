'use client';
import { useState } from 'react';
import CommentSection from './CommentSection';

export default function PostItem({ post, user, onUpdate }) {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [hasLiked, setHasLiked] = useState(
    user?.id && post.likes?.includes(user.id)
  );

  const categoryLabels = {
    problem: 'সমস্যা',
    new_idea: 'নতুন আইডিয়া',
    general: 'সাধারণ'
  };

  // Safe author name access
  const authorName = post.author?.name || 'অজানা ব্যবহারকারী';
  const authorRole = post.author?.role || 'student';

  const handleLike = async () => {
    if (!user?.id) {
      alert('লাইক করতে লগইন করুন');
      return;
    }

    try {
      const response = await fetch(`/api/posts/${post._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        setHasLiked(data.hasLiked);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
          <p className="text-sm text-gray-600">
            {authorName} • {categoryLabels[post.category]} • 
            {new Date(post.createdAt).toLocaleDateString('bn-BD')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs ${
            post.category === 'problem' ? 'bg-red-100 text-red-800' :
            post.category === 'new_idea' ? 'bg-green-100 text-green-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {categoryLabels[post.category]}
          </span>
          {authorRole === 'teacher' && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
              শিক্ষক
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4">{post.content}</p>

      <div className="flex items-center space-x-4 border-t pt-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            hasLiked ? 'text-red-600' : 'text-gray-600'
          }`}
          disabled={!user}
        >
          <span>❤️</span>
          <span className="text-gray-700">{likes}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-600"
        >
          <span>💬</span>
          <span className="text-gray-700">কমেন্ট</span>
        </button>
      </div>

      {showComments && (
        <CommentSection 
          postId={post._id} 
          user={user}
          onCommentAdded={onUpdate}
        />
      )}
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';

export default function CommentSection({ postId, user, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [totalComments, setTotalComments] = useState(0);

  // ----------------------------------------------------
  // ১. কমেন্ট আনা (Fetch Comments)
  // ----------------------------------------------------
  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      const data = await response.json();
      setComments(data);
      
      // মোট কমেন্ট কাউন্ট গণনা
      const count = calculateTotalComments(data);
      setTotalComments(count);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // রিকার্সিভ ফাংশন দিয়ে মোট কমেন্ট কাউন্ট করা
  const calculateTotalComments = (commentsArray) => {
    let count = 0;
    commentsArray.forEach(comment => {
      count++; 
      if (comment.replies && comment.replies.length > 0) {
        count += calculateTotalComments(comment.replies); 
      }
    });
    return count;
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // ----------------------------------------------------
  // ২. মূল মন্তব্য জমা দেওয়া (Submit Primary Comment)
  // ----------------------------------------------------
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          authorId: user.id,
          postId: postId
        }),
      });

      if (response.ok) {
        setNewComment('');
        fetchComments();
        onCommentAdded && onCommentAdded();
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  // ----------------------------------------------------
  // ৩. উত্তর জমা দেওয়া (Submit Reply)
  // ----------------------------------------------------
  const handleSubmitReply = async (parentCommentId, replyContent) => {
    if (!replyContent.trim()) return false;
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyContent,
          authorId: user.id,
          postId: postId,
          parentCommentId: parentCommentId
        }),
      });

      if (response.ok) {
        fetchComments();
        onCommentAdded && onCommentAdded();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating reply:', error);
      return false;
    }
  };

  // ----------------------------------------------------
  // ৪. কমেন্ট ডিসপ্লে কম্পোনেন্ট (Comment Component)
  // ----------------------------------------------------
  const Comment = ({ comment, depth = 0, onReplySubmit, currentUser }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [localReplyContent, setLocalReplyContent] = useState('');

    const handleLocalReplySubmit = async () => {
      const success = await onReplySubmit(comment._id, localReplyContent);
      
      if (success) {
        setLocalReplyContent('');
        setIsReplying(false);
      }
    };

    // ইন্ডেন্টেশন স্টাইল
    const getIndentationStyle = () => {
      if (depth === 0) return '';
      if (depth === 1) return 'ml-6 border-l-2 border-blue-200 pl-4';
      if (depth === 2) return 'ml-12 border-l-2 border-green-200 pl-4';
      return 'ml-16 border-l-2 border-purple-200 pl-4';
    };

    return (
      <div className={`mt-4 ${getIndentationStyle()}`}>
        <div className={`bg-gray-50 p-4 rounded-lg ${
          depth > 0 ? 'border border-gray-200' : ''
        }`}>
          {/* কমেন্ট হেডার - ব্যবহারকারী তথ্য */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
              {/* Added safe access to comment.author.name */}
              <p className="font-medium text-gray-800">{comment.author?.name || 'Unknown User'}</p>
              {comment.author?.role === 'teacher' && ( 
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  শিক্ষক
                </span>
              )}
              {depth > 0 && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  উত্তর
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString('bn-BD')}
            </p>
          </div>

          {/* কমেন্ট কন্টেন্ট */}
          <p className="text-gray-700 mb-3">{comment.content}</p>
          
          {/* রিপ্লাই বাটন */}
          <button
            onClick={() => {
              if (isReplying) setLocalReplyContent('');
              setIsReplying(!isReplying);
            }}
            className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
          >
            {isReplying ? 'উত্তর বাতিল' : 'উত্তর দিন'}
          </button>

          {/* রিপ্লাই ফর্ম */}
          {isReplying && (
            <div className="mt-3 p-3 bg-white border border-gray-200 rounded-md">
              <p className="text-sm text-gray-600 mb-2">
                <strong>{comment.author?.name || 'User'}</strong> -কে উত্তর দিচ্ছেন
              </p>
              <textarea
                value={localReplyContent}
                onChange={(e) => setLocalReplyContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="আপনার উত্তর লিখুন..."
                rows="3"
                autoFocus
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleLocalReplySubmit}
                  disabled={!localReplyContent.trim()}
                  className={`px-3 py-1 rounded-md text-sm ${
                    localReplyContent.trim() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-300 text-gray-100 cursor-not-allowed'
                  }`}
                >
                  উত্তর দিন
                </button>
                <button
                  onClick={() => {
                    setIsReplying(false);
                    setLocalReplyContent('');
                  }}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-400"
                >
                  বাতিল
                </button>
              </div>
            </div>
          )}
        </div>

        {/* রিপ্লাই গুলো ডিসপ্লে - CORRECT: key prop added to the nested Comment component */}
        {comment.replies && comment.replies.map((reply, index) => (
          <Comment 
            // ⚠️ Crucial Debugging Step: If reply._id is sometimes missing, use a fallback key like reply.id or a random number for temporary fixes.
            // Using `index` as a fallback is generally discouraged but can temporarily prevent the warning if data is unstable.
            key={reply._id || reply.id || index} 
            comment={reply} 
            depth={depth + 1}
            onReplySubmit={onReplySubmit}
            currentUser={currentUser}
          />
        ))}
      </div>
    );
  };

  // ----------------------------------------------------
  // ৫. মূল রেন্ডার (Main Render)
  // ----------------------------------------------------
  return (
    <div className="mt-6">
      {/* হেডার সেকশন - মোট কমেন্ট কাউন্ট */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">আলোচনা</h3>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          মোট মন্তব্য: {totalComments}
        </div>
      </div>

      {/* মন্তব্য ফর্ম */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="আপনার মন্তব্য লিখুন..."
          rows="3"
          required
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className={`px-4 py-2 rounded-md mt-2 transition duration-150 ease-in-out ${
            newComment.trim() 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          মন্তব্য করুন
        </button>
      </form>

      {/* মন্তব্য তালিকা */}
      <div className="space-y-4">
        {comments.map(comment => (
          <Comment 
            // Top-level comments key
            key={comment._id} 
            comment={comment} 
            onReplySubmit={handleSubmitReply}
            currentUser={user}
          />
        ))}
        
        {comments.length === 0 && (
          <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-lg mb-2">এখনও কোন মন্তব্য নেই</p>
            <p className="text-sm">আপনিই প্রথম মন্তব্যকারী হতে পারেন</p>
          </div>
        )}
      </div>
    </div>
  );
}
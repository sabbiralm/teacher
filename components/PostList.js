'use client';
import { useState, useEffect } from 'react';
import PostItem from './PostItem';

export default function PostList({ user }) {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { value: 'all', label: 'সব পোস্ট' },
    { value: 'problem', label: 'সমস্যা' },
    { value: 'new_idea', label: 'নতুন আইডিয়া' },
    { value: 'general', label: 'সাধারণ পোস্ট' }
  ];

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = selectedCategory === 'all' 
        ? '/api/posts' 
        : `/api/posts?category=${selectedCategory}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('পোস্ট লোড করতে সমস্যা হয়েছে');
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-700">পোস্ট লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchPosts}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">ক্যাটাগরি ফিল্টার করুন</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-gray-800"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value} className="text-gray-800">
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <PostItem 
            key={post._id} 
            post={post} 
            user={user}
            onUpdate={fetchPosts}
          />
        ))}
        
        {posts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {selectedCategory === 'all' 
              ? 'কোন পোস্ট পাওয়া যায়নি' 
              : 'এই ক্যাটাগরিতে কোন পোস্ট নেই'}
          </div>
        )}
      </div>
    </div>
  );
}
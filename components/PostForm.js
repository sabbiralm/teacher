'use client';
import { useState } from 'react';

export default function PostForm({ user, onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postData = {
      title,
      content,
      category,
      authorId: user.id
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        setCategory('general');
        onSubmit && onSubmit();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const categories = [
    { value: 'problem', label: 'সমস্যা' },
    { value: 'new_idea', label: 'নতুন আইডিয়া' },
    { value: 'general', label: 'সাধারণ পোস্ট' }
  ];

  // Teachers can post in any category, students only in specific ones
  const availableCategories = user.role === 'teacher' 
    ? categories 
    : categories.filter(cat => ['problem', 'new_idea', 'general'].includes(cat.value));

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">নতুন পোস্ট তৈরি করুন</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">শিরোনাম</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">বিষয়বস্তু</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md h-32 text-gray-800"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">ক্যাটাগরি</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
        >
          {availableCategories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        পোস্ট করুন
      </button>
    </form>
  );
}
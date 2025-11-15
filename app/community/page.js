'use client';
import { useState, useEffect } from 'react';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

export default function Home() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');

  // Demo user - production এ authentication system implement করতে হবে
  useEffect(() => {
    // Demo student user
    const demoUser = {
      id: '65a1b2c3d4e5f67890123456',
      name: 'রহিম স্ট্রোডেন্ট',
      email: 'rahim@example.com',
      role: 'student'
    };
    
    // Demo teacher user - switch করতে চাইলে
    // const demoUser = {
    //   id: '65a1b2c3d4e5f67890123457',
    //   name: 'ড. করিম আহমেদ',
    //   email: 'karim@example.com',
    //   role: 'teacher'
    // };
    
    setUser(demoUser);
  }, []);

  if (!user) {
    return <div className="text-center py-8">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">এডুকেশন ফোরাম</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.role === 'teacher' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {user.role === 'teacher' ? 'শিক্ষক' : 'ছাত্র'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'posts' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700'
            }`}
          >
            সব পোস্ট
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'create' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700'
            }`}
          >
            নতুন পোস্ট
          </button>
        </div>

        {activeTab === 'create' && (
          <PostForm 
            user={user} 
            onSubmit={() => {
              setActiveTab('posts');
              // Refresh posts list
            }}
          />
        )}

        {activeTab === 'posts' && <PostList user={user} />}
      </main>
    </div>
  );
}
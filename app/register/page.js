'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('রেজিস্ট্রেশন সফল! লগইন করুন।');
        router.push('/');
      } else {
        const error = await response.json();
        alert(error.error || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('নেটওয়ার্ক সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">একাউন্ট তৈরি করুন</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">নাম</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">ইমেইল</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">ভূমিকা</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            >
              <option value="student" className="text-gray-800">ছাত্র</option>
              <option value="teacher" className="text-gray-800">শিক্ষক</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
          >
            {loading ? 'রেজিস্ট্রেশন হচ্ছে...' : 'রেজিস্ট্রেশন করুন'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          ইতিমধ্যে একাউন্ট আছে?{' '}
          <button 
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
          >
            লগইন করুন
          </button>
        </p>
      </div>
    </div>
  );
}
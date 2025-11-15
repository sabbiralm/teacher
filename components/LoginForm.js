'use client';
import { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simple demo login - production এ proper authentication implement করতে হবে
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();
        onLogin(userData.user);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'লগইন ব্যর্থ হয়েছে');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('নেটওয়ার্ক সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials suggestion
  const demoCredentials = [
    { email: 'student@example.com', password: 'password123', role: 'ছাত্র' },
    { email: 'teacher@example.com', password: 'password123', role: 'শিক্ষক' }
  ];

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">লগইন করুন</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">ইমেইল</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">পাসওয়ার্ড</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 font-medium transition-colors"
        >
          {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="font-medium mb-2 text-gray-800">ডেমো একাউন্ট (টেস্টিং এর জন্য):</h3>
        <div className="space-y-1 text-sm">
          {demoCredentials.map((cred, index) => (
            <div key={index} className="flex justify-between text-gray-700">
              <span className="font-medium">{cred.role}:</span>
              <span>{cred.email} / {cred.password}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center mt-4 text-sm text-gray-600">
        একাউন্ট নেই?{' '}
        <a 
          href="/register"
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          রেজিস্ট্রেশন করুন
        </a>
      </p>
    </div>
  );
}
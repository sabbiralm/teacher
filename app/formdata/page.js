import { useState } from 'react';

export default function Home() {
  // ফর্মের ডেটা স্টেটে রাখব
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // ইনপুট ফিল্ডে টাইপ করলে এই ফাংশন কল হবে
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  // ফর্ম সাবমিট করলে এই ফাংশন কল হবে
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('✅ আপনার ডেটা সফলভাবে সেভ হয়েছে!');
        // ফর্ম ক্লিয়ার করি
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setMessage('❌ সমস্যা হয়েছে: ' + result.message);
      }
    } catch (error) {
      setMessage('❌ নেটওয়ার্ক ইরর: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: 'green' }}>
        ফর্ম ডেমো - MongoDB
      </h1>
      
      {/* মেসেজ দেখানোর জন্য */}
      {message && (
        <div style={{
          padding: '10px',
          margin: '20px 0',
          backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px',
          color: message.includes('✅') ? '#155724' : '#721c24'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
        {/* নাম ফিল্ড */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            আপনার নাম *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px'
            }}
            placeholder="আপনার পুরো নাম লিখুন"
          />
        </div>

        {/* ইমেইল ফিল্ড */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            ইমেইল এড্রেস *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px'
            }}
            placeholder="your@email.com"
          />
        </div>

        {/* ফোন ফিল্ড */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            ফোন নম্বর *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px'
            }}
            placeholder="01XXXXXXXXX"
          />
        </div>

        {/* মেসেজ ফিল্ড */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            মেসেজ
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px',
              resize: 'vertical'
            }}
            placeholder="আপনার মেসেজ লিখুন..."
          />
        </div>

        {/* সাবমিট বাটন */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? 'gray' : 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'সেভ হচ্ছে...' : 'ডেটা সাবমিট করুন'}
        </button>
      </form>
    </div>
  );
}
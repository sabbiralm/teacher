import connectDB from '../../lib/mongodb';
import FormData from '../../models/FormData';

export default async function handler(req, res) {
  // শুধু POST রিকুয়েস্ট একসেপ্ট করব
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // MongoDB-এর সাথে কানেক্ট করি
    await connectDB();
    
    // ফর্ম থেকে পাওয়া ডেটা
    const { name, email, phone, message } = req.body;
    
    // নতুন ডকুমেন্ট তৈরি করে সেভ করি
    const newFormData = new FormData({
      name,
      email,
      phone,
      message
    });
    
    await newFormData.save();
    
    // সাকসেস রেসপন্স পাঠাই
    res.status(200).json({ 
      success: true, 
      message: 'ডেটা সফলভাবে সেভ হয়েছে!',
      data: newFormData 
    });
    
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'ডেটা সেভ করতে সমস্যা হয়েছে' 
    });
  }
}
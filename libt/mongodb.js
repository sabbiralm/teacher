import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/myapp';

export default async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.log('MongoDB Connection Error:', error);
  }
}
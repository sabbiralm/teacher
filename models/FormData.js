import mongoose from 'mongoose';

// আমাদের ফর্মের ডেটা কী কী ফিল্ড থাকবে
const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// যদি মডেলটা আগে থেকেই থাকে, সেটা ব্যবহার করব, নাহলে নতুন তৈরি করব
export default mongoose.models.FormData || mongoose.model('FormData', FormDataSchema);
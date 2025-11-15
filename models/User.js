import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
}, { timestamps: true });

// Next.js এ Hot Reload বা Multiple Imports এ সমস্যা না হয় এর জন্য:
const User = mongoose.models?.User || mongoose.model('User', UserSchema);

export default User;

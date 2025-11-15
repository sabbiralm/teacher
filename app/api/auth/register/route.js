import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { name, email, password, role = 'user' } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user exists using Mongoose
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Create user using Mongoose
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password, // pre-save middleware automatically hash korbe
      role
    });

    await user.save();

    return NextResponse.json(
      { 
        message: 'User created successfully',
        userId: user._id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    
    // Mongoose error handling
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
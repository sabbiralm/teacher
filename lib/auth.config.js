import CredentialsProvider from 'next-auth/providers/credentials';
import {connectDB} from '@/lib/db';
import User from '@/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          await connectDb();
          
          const user = await User.findOne({ email: credentials.email.toLowerCase() });
          
          if (!user) {
            throw new Error('No user found with this email');
          }

          const isValid = await user.comparePassword(credentials.password);

          if (!isValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  }
};
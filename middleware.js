import { withAuth } from 'next-auth/middleware';
import { authOptions } from './lib/auth.config';

export default withAuth(
  function middleware(req) {
    // Additional logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes
        if (pathname.startsWith('/auth') || pathname === '/') {
          return true;
        }

        // Admin routes
        if (pathname.startsWith('/admin') && token?.role !== 'admin') {
          return false;
        }

        // User routes
        if (pathname.startsWith('/user') && !token) {
          return false;
        }

        return !!token;
      }
    }
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/user/:path*',
    '/notes/:path*'
  ]
};
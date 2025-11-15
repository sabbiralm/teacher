import { getServerSession } from 'next-auth';
import { authOptions } from './auth.config';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export async function checkRole(allowedRoles) {
  const user = await getCurrentUser();
  if (!user || !allowedRoles.includes(user.role)) {
    throw new Error('Access denied');
  }
  return user;
}
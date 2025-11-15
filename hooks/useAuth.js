import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth(required = false, allowedRoles = []) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (required && !session) {
      router.push('/auth/signin');
      return;
    }

    if (session && allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
      router.push('/unauthorized');
    }
  }, [session, status, required, allowedRoles, router]);

  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: !!session
  };
}
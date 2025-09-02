import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import { UserAccessResponse } from '@/types/user';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const router = useRouter();
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const setToken = (user: UserAccessResponse | null) => {
    if (!user) {
      localStorage.removeItem('token');
      context.setUserToken(null);
      return;
    }
    localStorage.setItem('token', user.jwt);
    context.setUserToken(user.jwt);
  };

  const redirectIfNotAuth = () => {
    if (!context.userToken) router.push('/login');
  };

  const redirectIfAuth = () => {
    if (context.userToken) router.push('/');
  };

  return {
    ...context,
    setToken,
    redirectIfNotAuth,
    redirectIfAuth
  };
};
'use client';
import { useCallback } from 'react';
import { useFetch } from '@/shared/lib/hooks';
import { loginAtom, logoutAtom } from '../model/actions';
import { useAtom, useSetAtom } from 'jotai';
import { authInitializedAtom } from '../model/atoms';

export const useAuthInit = () => {
  const { getData } = useFetch();
  const login = useSetAtom(loginAtom);
  const logout = useSetAtom(logoutAtom);
  const [isInitialized, setIsInitialized] = useAtom(authInitializedAtom);

  const initializeAuth = useCallback(async () => {
    try {
      const session = await getData(
        'http://localhost:5000/api/auth/session-check',
        {
          credentials: 'include',
        }
      );
      console.log('Session check result:', session);

      if (session && session.userId) {
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (storedUser && storedUser.userId === session.userId) {
          login(storedUser);
        } else {
          const userData = await getData(
            `http://localhost:5000/api/user/${session.userId}`
          );
          console.log('suc');
          login(userData);
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error('Auth init error:', error);
      logout();
    } finally {
      setIsInitialized(true);
    }
  }, []);

  return { isInitialized, initializeAuth };
};

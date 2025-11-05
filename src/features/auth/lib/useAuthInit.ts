'use client'
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useFetch } from '@/shared/lib/hooks';
import { loginAtom, logoutAtom } from '../model/actions';

export const useAuthInit = () => {
  const { getData } = useFetch();
  const login = useSetAtom(loginAtom);
  const logout = useSetAtom(logoutAtom);

  useEffect(() => {
    const initializeAuth = async () => {
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
            login(userData);
          }
        } else {
          logout();
        }
      } catch (error) {
        console.error('Auth init error:', error);
        logout();
      }
    };
    initializeAuth();
  }, []);
};

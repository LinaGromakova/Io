'use client';
import { LoginPage } from '@/pages/LoginPage';
import { useAuthInit } from '@/features/auth/lib/useAuthInit';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import { redirect } from '@/shared/lib/redirect/redirect';
import { useEffect } from 'react';
import { AppLoader } from '@/shared/ui/AppLoader/AppLoader';

export default function Login() {
  const { isAuth } = useAuthState();
  const { isInitialized } = useAuthInit();

  useEffect(() => {
    if (isInitialized) {
      if (isAuth) {
        redirect('/');
      }
    }
  }, [isInitialized, isAuth]);
 if (!isInitialized) {
    return <AppLoader></AppLoader>;
  }
  return <LoginPage></LoginPage>;
}

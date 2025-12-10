'use client';
import { LoginPage } from '@/pages/LoginPage';
import { useAuthInit } from '@/features/auth/lib/useAuthInit';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import { useEffect } from 'react';
import { AppLoader } from '@/shared/ui/AppLoader/AppLoader';
import { redirect } from '@/shared/lib/redirect/redirect';

export default function Login() {
  const { isAuth } = useAuthState();
  const { isInitialized } = useAuthInit();
  useEffect(() => {
    if (isInitialized && isAuth) {
      redirect('/');
    }
  }, [isInitialized, isAuth]);

  if (!isInitialized) {
    return <AppLoader></AppLoader>;
  }
  return <LoginPage></LoginPage>;
}

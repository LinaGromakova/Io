'use client';
import { LoginPage } from '@/pages/LoginPage';
import { useAuthInit } from '@/features/auth/lib/hooks';
import { useAuthState } from '@/features/auth/lib/hooks';
import { useEffect } from 'react';
import { redirect } from '@/shared/lib/redirect/redirect';
import { AppLoader } from '@/shared/ui/AppLoader';

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

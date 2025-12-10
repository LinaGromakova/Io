'use client';
import { useAuthInit } from '@/features/auth/lib/useAuthInit';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import { MainPage } from '@/pages/MainPage';
import { redirect } from '@/shared/lib/redirect/redirect';
import { AppLoader } from '@/shared/ui/AppLoader/AppLoader';
import { useEffect } from 'react';

export default function Home() {
  const { isAuth } = useAuthState();
  const { isInitialized } = useAuthInit();

  useEffect(() => {
    if (isInitialized && !isAuth) {
      redirect('/login');
    }
  }, [isAuth, isInitialized]);

  if (!isInitialized || !isAuth) {
    return <AppLoader></AppLoader>;
  }

  return <MainPage />;
}

'use client';
import { useAuthInit } from '@/features/auth/lib/hooks';
import { useAuthState } from '@/features/auth/lib/hooks';
import RegistrationPage from '@/pages/RegisterPage';
import { redirect } from '@/shared/lib/redirect/redirect';
import { AppLoader } from '@/shared/ui/AppLoader';
import { useEffect } from 'react';

export default function Register() {
  const { isAuth } = useAuthState();

  const { isInitialized } = useAuthInit();

  useEffect(() => {
    if (isInitialized && isAuth) {
      redirect('/');
    }
  }, [isAuth, isInitialized]);
  if (!isInitialized) {
    return <AppLoader></AppLoader>;
  }
  return <RegistrationPage></RegistrationPage>;
}

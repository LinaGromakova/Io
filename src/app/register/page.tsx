'use client';
import { useAuthInit } from '@/features/auth/lib/useAuthInit';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import { RegistrationPage } from '@/pages/RegisterPage';
import { redirect } from '@/shared/lib/redirect/redirect';
import { AppLoader } from '@/shared/ui/AppLoader/AppLoader';
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

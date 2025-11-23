'use client';
import { useAuthInit } from '@/features/auth/lib/useAuthInit';
import { useAuthSocket } from '@/features/auth/lib/useAuthSocket';
import { useChatData } from '@/features/ChatList/lib/useChatData';
import { useEffect } from 'react';

export function AuthInitializer() {
  const { initializeAuth } = useAuthInit();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  useAuthSocket();
  useChatData();
  return null;
}

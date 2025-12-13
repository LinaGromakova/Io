'use client';
import { useAuthInit } from '@/features/auth/lib/hooks';
import { useAuthSocket } from '@/features/auth/lib/hooks';
import { useChatData } from '@/features/chat-list/lib/hooks';
import { useEffect } from 'react';

export function AuthInitializer() {
  const { initializeAuth } = useAuthInit();

  useEffect(() => {
    initializeAuth();
  }, []);
  useAuthSocket();
  useChatData();
  return null;
}

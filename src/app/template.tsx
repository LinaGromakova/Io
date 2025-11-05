'use client';
import { useSetAtom } from 'jotai';
import { initSocketAtom } from '@/features/socket/lib/useSocket';
import { useModalMessage } from '@/features/interface-state/lib/hooks';
import { ModalMessage } from '@/shared/ui/Modals';
import { useEffect, useLayoutEffect } from 'react';
import { useAuthInit } from '@/features/auth/lib/useAuthInit';
import { useAuthSocket } from '@/features/auth/lib/useAuthSocket';
import { useChatData } from '@/features/ChatList/lib/useChatData';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Template({ children }: { children: React.ReactNode }) {
  const modal = useModalMessage();
  const { theme } = useTheme();

  const initSocket = useSetAtom(initSocketAtom);
  useEffect(() => {
    initSocket();
  }, []);

  // useLayoutEffect(() => {
  //   document.body.className = `theme-${theme}`;
  // }, [theme]);
  useAuthInit();
  useAuthSocket();
  useChatData();
  return (
    <>
      {children}
      <ModalMessage
        message={modal.state.message}
        isOpen={modal.state.open}
        onClose={modal.close}
      />
    </>
  );
}

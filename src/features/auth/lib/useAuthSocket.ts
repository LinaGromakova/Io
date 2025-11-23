'use client';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom, isAuthAtom } from '../model/atoms';
import { getSocket } from '@/features/socket/lib/useSocket';

export const useAuthSocket = () => {
  const user = useAtomValue(userAtom);
  const isAuth = useAtomValue(isAuthAtom);
  const socket = getSocket();
  useEffect(() => {
    if (isAuth && user?.userId) {
      socket.emit('connectApp', {
        userId: user.userId,
        onlineStatus: true,
      });
    }
  }, [isAuth, user?.userId]);
};

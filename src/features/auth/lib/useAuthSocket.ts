'use client';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom, isAuthAtom } from '../model/atoms';
import { socketAtom } from '@/features/socket/lib/useSocket';

export const useAuthSocket = () => {
  // const user = useAtomValue(userAtom);
  // const isAuth = useAtomValue(isAuthAtom);
  // const socket = useAtomValue(socketAtom);
  // useEffect(() => {
  //   if (isAuth && user?.userId) {
  //     socket.emit('connect_app', {
  //       userId: user.userId,
  //       onlineStatus: true,
  //     });
  //   }
  // }, [isAuth, user?.userId]);
};

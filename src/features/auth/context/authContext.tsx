'use client';
import React, { useEffect } from 'react';
import { useAuthInit } from '../hooks/useAuthInit';
import { useSocketContext } from '@/features/socket/context/socketContext';
import { useAuth } from '../hooks/useAuth';

interface UserInterface {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastSeen: string;
  createdAt: string;
}

interface AuthContextInterface {
  user: UserInterface;
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<AuthContextInterface>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthInit();
  const { isAuth, setIsAuth, user, setUser } = useAuth();
  const { socket, isConnected } = useSocketContext();
  useEffect(() => {
    if (isAuth && isConnected && user?.userId) {
      socket.emit('connect_app', {
        userId: user.userId,
        onlineStatus: true,
      });
    }
  }, [isAuth, isConnected, user?.userId, socket]);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

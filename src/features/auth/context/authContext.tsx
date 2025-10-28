'use client';
import React, { useEffect, useState } from 'react';
import { useFetch, useLocalStorage } from '@/shared/lib/hooks';
import { socket } from '@/features/socket/context/socketContext';

interface UserInterface {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastSeen: string;
  createdAt: string;
}

interface AuthContextInterface {
  user: UserInterface | null;
  isAuth: boolean;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  user: null,
  isAuth: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { getData } = useFetch();
  const { updateUser, storage, removeUserData } = useLocalStorage();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await getData(
          'http://localhost:5000/api/auth/session-check',
          {
            credentials: 'include',
          }
        );

        console.log('Session check result:', session);

        if (session && session.userId) {
          if (storage.user && storage.user.userId === session.userId) {
            setUser(storage.user);
            setIsAuth(true);
          } else {
            const userData = await getData(
              `http://localhost:5000/api/user/${session.userId}`
            );
            setUser(userData);
            updateUser(userData);
            setIsAuth(true);
          }
        } else {
          setIsAuth(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth init error:', error);
        setIsAuth(false);
        setUser(null);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (user?.userId && isAuth) {
      console.log('Emitting socket for user:', user.userId);
      socket.emit('connectApp', {
        userId: user.userId,
        onlineStatus: true,
      });
    }
  }, [isAuth, user?.userId]);

  const value = {
    user,
    isAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import React, { useEffect } from 'react';
import { useAuthInit } from '../hooks/useAuthInit';
import { useSocketContext } from '@/features/socket/context/socketContext';

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
  const authState = useAuthInit();
  const { socket, isConnected } = useSocketContext();
  
  useEffect(() => {
    if (authState.isAuth && isConnected && authState.user?.userId) {
      socket.emit('connect_app', {
        userId: authState.user.userId,
        onlineStatus: true,
      });
    }
  }, [authState.isAuth, isConnected, authState.user?.userId, socket]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextInterface {
  return React.useContext(AuthContext);
}

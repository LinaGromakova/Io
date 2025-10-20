'use client';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextInterface {
  socket: Socket;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}
export const SocketContext = React.createContext<SocketContextInterface>(null!);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  const socket = io('http://localhost:5000', {
    autoConnect: false,
  });

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  const connect = () => socket.connect();
  const disconnect = () => socket.disconnect();

  const value = { socket, isConnected, connect, disconnect };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocketContext(): SocketContextInterface {
  return React.useContext(SocketContext);
}

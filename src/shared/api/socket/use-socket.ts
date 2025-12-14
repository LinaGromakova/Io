import { API_URL } from '@/shared/lib/config';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(`${API_URL}`, {
      transports: ['websocket'],
    });
  }
  return socket;
};

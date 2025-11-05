import { atom } from 'jotai';
import { io, Socket } from 'socket.io-client';

export const socketAtom = atom<Socket>();

export const initSocketAtom = atom(null, (get, set) => {
  if (typeof window === 'undefined') return;

  const existing = get(socketAtom);
  if (!existing) {
    const socket = io('http://localhost:5000');
    set(socketAtom, socket);
  }
});

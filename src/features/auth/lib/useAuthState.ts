'use client';
import { useAtomValue, useSetAtom } from 'jotai';
import { userAtom, isAuthAtom } from '../model/atoms';

export const useAuthState = () => ({
  user: useAtomValue(userAtom),
  isAuth: useAtomValue(isAuthAtom),
});

export const useAuthSetters = () => ({
  setUser: useSetAtom(userAtom),
  setIsAuth: useSetAtom(isAuthAtom),
});

import { atom } from 'jotai';
import { isAuthAtom, userAtom } from './auth-atoms';
import { UserInterface } from '@/shared/types/domain';

export const loginAtom = atom(null, (get, set, userData: UserInterface) => {
  set(userAtom, userData);
  set(isAuthAtom, true);
});

export const logoutAtom = atom(null, (get, set) => {
  set(userAtom, null);
  set(isAuthAtom, false);
  localStorage.removeItem('userData');
});

export const updateUserAtom = atom(
  null,
  (get, set, userData: Partial<UserInterface>) => {
    const currentUser = get(userAtom);
    if (currentUser) {
      set(userAtom, { ...currentUser, ...userData });
    }
  }
);

import { atom } from 'jotai';

export const isBlockAtom = atom(false);

export const setIsBlockAtom = atom(null, (get, set, value: boolean) => {
  set(isBlockAtom, value);
});
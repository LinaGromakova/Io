import { atom } from 'jotai';

export const isBlackListOpenAtom = atom(false);

export const toggleBlackListAtom = atom(false, (get, set) => {
  set(isBlackListOpenAtom, !get(isBlackListOpenAtom));
});

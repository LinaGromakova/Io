import { atom } from 'jotai';

export const isAddUserOpenAtom = atom(false);

export const toggleAddUserAtom = atom(false, (get, set) => {
  set(isAddUserOpenAtom, !get(isAddUserOpenAtom));
});

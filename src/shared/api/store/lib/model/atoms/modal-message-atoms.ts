import { atom } from 'jotai';
export const modalMessageAtom = atom<{ message: string; open: boolean }>({
  message: '',
  open: false,
});

export const openModalMessageAtom = atom(false, (get, set, message: string) => {
  set(modalMessageAtom, { message, open: true });
});

export const closeModalMessageAtom = atom(false, (get, set) => {
  set(modalMessageAtom, { message: '', open: false });
});

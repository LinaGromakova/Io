import { atom } from 'jotai';

export const isOptionsSidebarOpenAtom = atom(false);
export const isUserSettingsOpenAtom = atom(false);
export const isAddUserOpenAtom = atom(false);
export const isSidebarOpenAtom = atom(true);
export const isBlackListOpenAtom = atom(false);
export const modalMessageAtom = atom<{ message: string; open: boolean }>({
  message: '',
  open: false,
});

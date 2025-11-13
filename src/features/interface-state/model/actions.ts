import { atom } from 'jotai';

import {
  isOptionsSidebarOpenAtom,
  isUserSettingsOpenAtom,
  isAddUserOpenAtom,
  isSidebarOpenAtom,
  isBlackListOpenAtom,
  modalMessageAtom,
} from './atoms';

export const toggleOptionsSidebarAtom = atom(false, (get, set) => {
  set(isOptionsSidebarOpenAtom, !get(isOptionsSidebarOpenAtom));
});

export const setSidebarOpenAtom = atom(null, (get, set, value: boolean) => {
  set(isSidebarOpenAtom, value);
});

export const toggleBlackListAtom = atom(false, (get, set) => {
  set(isBlackListOpenAtom, !get(isBlackListOpenAtom));
});

export const toggleAtom = atom(null, (get, set, atomToToggle: any) => {
  set(atomToToggle, !get(atomToToggle));
});

export const openModalMessageAtom = atom(false, (get, set, message: string) => {
  set(modalMessageAtom, { message, open: true });
});

export const closeModalMessageAtom = atom(false, (get, set) => {
  set(modalMessageAtom, { message: '', open: false });
});
export const toggleUserSettingsAtom = atom(false, (get, set) => {
  set(isUserSettingsOpenAtom, !get(isUserSettingsOpenAtom));
});

export const toggleAddUserAtom = atom(false, (get, set) => {
  set(isAddUserOpenAtom, !get(isAddUserOpenAtom));
});
export {
  isOptionsSidebarOpenAtom,
  isSidebarOpenAtom,
  isAddUserOpenAtom,
  isUserSettingsOpenAtom,
  isBlackListOpenAtom,
};

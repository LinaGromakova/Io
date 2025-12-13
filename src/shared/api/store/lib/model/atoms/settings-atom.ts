import { atom } from 'jotai';
export const isUserSettingsOpenAtom = atom(false);

export const toggleUserSettingsAtom = atom(false, (get, set) => {
  set(isUserSettingsOpenAtom, !get(isUserSettingsOpenAtom));
});
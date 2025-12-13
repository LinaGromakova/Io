import { atom } from 'jotai';
export const isSidebarOpenAtom = atom(true);
export const setSidebarOpenAtom = atom(null, (get, set, value: boolean) => {
  set(isSidebarOpenAtom, value);
});

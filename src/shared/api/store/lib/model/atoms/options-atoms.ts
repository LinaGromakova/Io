import { atom, WritableAtom } from 'jotai';
export const isOptionsSidebarOpenAtom = atom(false);

export const toggleOptionsSidebarAtom = atom(false, (get, set) => {
  set(isOptionsSidebarOpenAtom, !get(isOptionsSidebarOpenAtom));
});
export const toggleAtom = atom(null, (get, set, atomToToggle: WritableAtom<unknown, [boolean], unknown>) => {
  set(atomToToggle, !get(atomToToggle));
});

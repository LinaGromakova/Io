import { useAtomValue, useSetAtom } from 'jotai';
import { isOptionsSidebarOpenAtom, toggleOptionsSidebarAtom } from '../model/atoms/options-atoms';

export const useOptions = () => ({
  isOptionsSidebarOpen: useAtomValue(isOptionsSidebarOpenAtom),
  toggleSidebarOptions: useSetAtom(toggleOptionsSidebarAtom),
});

import { useAtomValue, useSetAtom } from 'jotai';
import { isSidebarOpenAtom, setSidebarOpenAtom } from '../model/atoms/sidebar-atoms';

export const useSidebar = () => ({
  isSidebarOpen: useAtomValue(isSidebarOpenAtom),
  setSidebarOpen: useSetAtom(setSidebarOpenAtom),
});

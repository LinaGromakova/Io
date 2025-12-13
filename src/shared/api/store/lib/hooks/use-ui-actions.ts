import { useSetAtom } from 'jotai';
import { toggleAddUserAtom } from '../model/atoms/add-user-atom';
import { setSidebarOpenAtom } from '../model/atoms/sidebar-atoms';
import { toggleAtom } from '../model/atoms/options-atoms';

export const useUiActions = () => ({
  toggleAddUser: useSetAtom(toggleAddUserAtom),
  setSidebar: useSetAtom(setSidebarOpenAtom),
  toggleBubbleMenu: useSetAtom(toggleAtom),
});

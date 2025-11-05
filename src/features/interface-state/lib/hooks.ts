import { useAtomValue, useSetAtom } from 'jotai';
import {
  isOptionsSidebarOpenAtom,
  isSidebarOpenAtom,
  openModalMessageAtom,
  toggleOptionsSidebarAtom,
  toggleSidebarAtom,
  closeModalMessageAtom,
  toggleAtom,
  toggleAddUserAtom,
  isAddUserOpenAtom,
  toggleUserSettingsAtom,
  isUserSettingsOpenAtom,
  toggleBlackListAtom,
  isBlackListOpenAtom,
} from '../model/actions';

import { modalMessageAtom } from '../model/atoms';

export const useAddUser = () => ({
  isAddUserOpen: useAtomValue(isAddUserOpenAtom),
  toggleAddUser: useSetAtom(toggleAddUserAtom),
});

export const useSettings = () => ({
  isSettingsOpen: useAtomValue(isUserSettingsOpenAtom),
  toggleSettings: useSetAtom(toggleUserSettingsAtom),
});

export const useSidebar = () => ({
  isSidebarOpen: useAtomValue(isSidebarOpenAtom),
  toggleSidebarOpen: useSetAtom(toggleSidebarAtom),
});

export const useOptions = () => ({
  isOptionsSidebarOpen: useAtomValue(isOptionsSidebarOpenAtom),
  toggleSidebarOptions: useSetAtom(toggleOptionsSidebarAtom),
});

export const useModalMessage = () => ({
  state: useAtomValue(modalMessageAtom),
  open: useSetAtom(openModalMessageAtom),
  close: useSetAtom(closeModalMessageAtom),
});

export const useBlackList = () => ({
  isBlackListOpen: useAtomValue(isBlackListOpenAtom),
  toggleBlackList: useSetAtom(toggleBlackListAtom),
});

export const useUiActions = () => ({
  toggleAddUser: useSetAtom(toggleAddUserAtom),
  toggleSidebar: useSetAtom(toggleSidebarAtom),
  toggleBubbleMenu: useSetAtom(toggleAtom),
});

import { useAtomValue, useSetAtom } from 'jotai';
import { isUserSettingsOpenAtom, toggleUserSettingsAtom } from '../model/atoms/settings-atom';

export const useSettings = () => ({
  isSettingsOpen: useAtomValue(isUserSettingsOpenAtom),
  toggleSettings: useSetAtom(toggleUserSettingsAtom),
});


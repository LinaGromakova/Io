import { useAtomValue, useSetAtom } from 'jotai';
import { themeAtom, toggleThemeAtom } from '../model/atoms';

export const useTheme = () => ({
  theme: useAtomValue(themeAtom),
  toggleTheme: useSetAtom(toggleThemeAtom),
});

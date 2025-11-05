import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const themeAtom = atomWithStorage<'dark' | 'light'>(
  'preferTheme',
  'dark'
);

export const toggleThemeAtom = atom(null, (get, set) => {
  const current = get(themeAtom);
  const newTheme = current === 'light' ? 'dark' : 'light';

  set(themeAtom, newTheme);
});

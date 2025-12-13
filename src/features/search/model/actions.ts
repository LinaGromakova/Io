import { atom } from 'jotai';
import { filterAtom, searchUserAtom } from './atoms';

export const setSearchUserAtom = atom('', (get, set, value: string) => {
  set(searchUserAtom, value);
});

export const setFilterAtom = atom('', (get, set, filter: string) => {
  set(filterAtom, filter);
});

export const filterUsersAtom = atom('', (get, set, value: string) => {
  set(filterAtom, value);
});

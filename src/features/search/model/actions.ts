import { atom } from 'jotai';
import { filterAtom, searchUserAtom } from './atoms';

export const setSearchUserAtom = atom('', (get, set, query: string) => {
  set(searchUserAtom, query);
});

export const setFilterAtom = atom('', (get, set, filter: string) => {
  set(filterAtom, filter);
});

export const filterUsersAtom = atom(
  '',
  (get, set, event: { target: { value: string } }) => {
    set(filterAtom, event.target.value);
  }
);

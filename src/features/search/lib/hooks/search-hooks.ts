import { useAtomValue, useSetAtom } from 'jotai';
import { filterAtom, searchUserAtom } from '../../model/atoms';
import {
  filterUsersAtom,
  setFilterAtom,
  setSearchUserAtom,
} from '../../model/actions';

export const useSearchState = () => ({
  searchUser: useAtomValue(searchUserAtom),
  filter: useAtomValue(filterAtom),
});

export const useSearchActions = () => ({
  setSearchUser: useSetAtom(setSearchUserAtom),
  setFilter: useSetAtom(setFilterAtom),
  filterUsers: useSetAtom(filterUsersAtom),
});

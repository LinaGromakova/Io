import { atomFamily } from 'jotai/utils';
import { searchUserAtom, filterAtom } from '@/features/search/model/atoms';
import { isAddUserOpenAtom } from '@/shared/api/store/lib/model/atoms/add-user-atom';
import { atom } from 'jotai';
import { UserShortInterface, ChatInterface } from '@/shared/types/domain';

export const showEmptySearchPromptAtom = atomFamily(() =>
  atom((get) => {
    const isAddingNewUsers = get(isAddUserOpenAtom);
    const isEmptySearch = get(searchUserAtom) === '';
    return isAddingNewUsers && isEmptySearch;
  })
);

export const showUserListAtom = atomFamily((users:  UserShortInterface[]) =>
  atom((get) => {
    const isAddingNewUsers = get(isAddUserOpenAtom);
    const hasSearchQuery = get(searchUserAtom) !== '';
    const hasUsers = users.length > 0;
    return isAddingNewUsers && hasSearchQuery && hasUsers;
  })
);

export const showUserNotFoundAtom = atomFamily((users:  UserShortInterface[]) =>
  atom((get) => {
    const isAddingNewUsers = get(isAddUserOpenAtom);
    const hasSearchQuery = get(searchUserAtom) !== '';
    const hasUsers = users.length === 0;
    return isAddingNewUsers && hasSearchQuery && hasUsers;
  })
);

export const showNoChatsAtom = atomFamily((chats: ChatInterface[]) =>
  atom((get) => {
    const isAddingNewUsers = get(isAddUserOpenAtom);
    if (chats) {
      const hasChats = chats.length === 0;
      return !isAddingNewUsers && hasChats;
    }
  })
);

export const showFilteredChatsAtom = atomFamily(
  (filteredChats: ChatInterface[]) =>
    atom((get) => {
      const isAddingNewUsers = get(isAddUserOpenAtom);
      const isFiltering = get(filterAtom);
      const hasFilteredChats = filteredChats.length > 0;
      return !isAddingNewUsers && isFiltering && hasFilteredChats;
    })
);

export const showNoFilteredResultsAtom = atomFamily(
  (filteredChats: ChatInterface[]) =>
    atom((get) => {
      const isAddingNewUsers = get(isAddUserOpenAtom);
      const isFiltering = get(filterAtom);
      const hasFilteredChats = filteredChats.length === 0;
      return !isAddingNewUsers && isFiltering && hasFilteredChats;
    })
);

export const showAllChatsAtom = atomFamily((chats: ChatInterface[]) =>
  atom((get) => {
    const isAddingNewUsers = get(isAddUserOpenAtom);
    const isFiltering = get(filterAtom);
    if (chats) {
      const hasChats = chats.length > 0;
      return !isAddingNewUsers && !isFiltering && hasChats;
    }
  })
);

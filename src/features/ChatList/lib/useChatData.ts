import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useFetch } from '@/shared/lib/hooks';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import {
  setChatsAtom,
  setUsersAtom,
  setFilteredChatsAtom,
} from '../model/chatAtoms';
import { isAddUserOpenAtom } from '@/features/interface-state/model/atoms';
import { useAtomValue } from 'jotai';
import { useSearchState } from '@/features/search/lib/hooks';
import { debounce } from '@/shared/lib/debounce';

export const useChatData = () => {
  const { getData } = useFetch();
  const { user } = useAuthState();
  const setChats = useSetAtom(setChatsAtom);
  const setUsers = useSetAtom(setUsersAtom);
  const setFilteredChats = useSetAtom(setFilteredChatsAtom);
  const isAddUserOpen = useAtomValue(isAddUserOpenAtom);
  const { searchUser, filter } = useSearchState();

  useEffect(() => {
    async function loadChats() {
      if (!user?.userId) return;

      try {
        const data = await getData(
          `http://localhost:5000/api/chats/user/${user.userId}`
        );
        setChats(data);
      } catch (error) {
        console.error('Load chat error: ', error);
      }
    }

    loadChats();
  }, [user?.userId, setChats]);

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      if (isAddUserOpen && searchUser) {
        try {
          const users = await getData(
            `http://localhost:5000/api/users/search/${searchUser}/${user?.userId}`
          );
          setUsers(users);
        } catch (error) {
          console.error('Search users error: ', error);
        }
      }
    }, 250);

    debouncedFetch();
  }, [isAddUserOpen, searchUser, user?.userId, setUsers]);

  useEffect(() => {
    setFilteredChats(filter);
  }, [filter, setFilteredChats]);
};

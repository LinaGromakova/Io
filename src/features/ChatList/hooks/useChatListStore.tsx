'use client';
import { useEffect, useState } from 'react';
import { ChatInterface } from '../types/ChatInterface';
import { useSearchContext, useUiContext } from '@/features/common/contexts';
import { useFetch } from '@/shared/lib/hooks';
import { debounce } from '@/shared/lib/debounce';
import { UserInterface } from '../types/UserInterface';

export function useChatListStore(userId: string) {
  const { getData } = useFetch();

  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [filteredChats, setFilteredChats] = useState<ChatInterface[]>([]);

  const filter = useSearchContext().filter; // ← перерендер ТОЛЬКО когда меняется filter
  const searchUser = useSearchContext().searchUser; // ← перерендер ТОЛЬКО когда меняется searchUser
  const isAddUserOpen = useUiContext().isAddUserOpen; // ← перерендер ТОЛЬКО когда меняется isAddUserO
  useEffect(() => {
    async function loadChats() {
      if (!userId || userId === '') {
        return;
      }
      try {
        const data = await getData(
          `http://localhost:5000/api/chats/user/${userId}`
        );
        return setChats(data);
      } catch (error) {
        console.error('Load chat error: ', error);
      }
    }

    loadChats();
  }, [userId]);

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      if (isAddUserOpen) {
        const users = await getData(
          `http://localhost:5000/api/users/search/${searchUser}`
        );
        setUsers(users);
      }
    }, 250);

    debouncedFetch();
  }, [isAddUserOpen, searchUser, userId]);

  useEffect(() => {
    setFilteredChats(
      chats.filter((chat: ChatInterface) =>
        chat.userName.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, chats]);

  return { chats, setChats, users, setUsers, filteredChats, setFilteredChats };
}

'use client';
import { useEffect, useState } from 'react';
import { ChatInterface } from '../types/ChatInterface';
import { useSearchContext, useUiContext } from '@/features/common/contexts';
import { useFetch } from '@/shared/lib/hooks';
import { debounce } from '@/shared/lib/debounce';
import { UserInterface } from '../types/UserInterface';

export function useChatListStore(userId: string) {
  const { getData } = useFetch();
  const { filter } = useSearchContext();
  const { searchUser } = useSearchContext();
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);

  const [filteredChats, setFilteredChats] = useState<ChatInterface[]>([]);
  const { isAddUserOpen } = useUiContext();

  useEffect(() => {
    async function loadChats() {
      const data = await getData(`http://localhost:5000/chats/${userId}`);
      setChats(data);
    }
    loadChats();
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      if (isAddUserOpen) {
        const users = await getData(
          `http://localhost:5000/search/${searchUser}`
        );
        setUsers(users);
      }
    }, 250);

    debouncedFetch();
  }, [isAddUserOpen, searchUser]);

  useEffect(() => {
    setFilteredChats(
      chats.filter((chat: ChatInterface) =>
        chat.userName.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter]);

  return { chats, setChats, users, setUsers, filteredChats, setFilteredChats };
}

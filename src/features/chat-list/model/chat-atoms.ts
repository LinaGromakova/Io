import { atom } from 'jotai';
import { UserInterface, ChatInterface } from '@/shared/types/domain';

export const chatsAtom = atom<ChatInterface[] | undefined>(undefined);
export const usersAtom = atom<UserInterface[]>([]);
export const filteredChatsAtom = atom<ChatInterface[]>([]);

export const setChatsAtom = atom(null, (get, set, chats: ChatInterface[]) => {
  set(chatsAtom, chats);
});

export const setUsersAtom = atom(
  null,
  (get, set, users: UserInterface[]) => {
    set(usersAtom, users);
  }
);

export const setFilteredChatsAtom = atom(null, (get, set, filter: string) => {
  const chats = get(chatsAtom);
  if (chats) {
    const filtered = chats.filter((chat) =>
      chat.userName.toLowerCase().includes(filter.toLowerCase())
    );
    set(filteredChatsAtom, filtered);
  }
});

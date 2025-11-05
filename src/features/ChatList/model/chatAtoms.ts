import { atom } from 'jotai';
import { ChatInterface } from '../types/ChatInterface';
import { UserInterface } from '../types/UserInterface';

export const chatsAtom = atom<ChatInterface[]>([]);
export const usersAtom = atom<UserInterface[]>([]);
export const filteredChatsAtom = atom<ChatInterface[]>([]);

export const setChatsAtom = atom(null, (get, set, chats: ChatInterface[]) => {
  set(chatsAtom, chats);
});

export const setUsersAtom = atom(null, (get, set, users: UserInterface[]) => {
  set(usersAtom, users);
});

export const setFilteredChatsAtom = atom(null, (get, set, filter: string) => {
  const chats = get(chatsAtom);
  const filtered = chats.filter((chat) =>
    chat.userName.toLowerCase().includes(filter.toLowerCase())
  );
  set(filteredChatsAtom, filtered);
});

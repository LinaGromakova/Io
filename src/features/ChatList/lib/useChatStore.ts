import { useAtomValue } from 'jotai';
import { chatsAtom, usersAtom, filteredChatsAtom } from '../model/chatAtoms';

export const useChatStore = () => ({
  chats: useAtomValue(chatsAtom),
  users: useAtomValue(usersAtom),
  filteredChats: useAtomValue(filteredChatsAtom),
});

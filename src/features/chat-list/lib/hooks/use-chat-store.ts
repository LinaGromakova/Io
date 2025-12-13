import { useAtomValue } from 'jotai';
import {
  chatsAtom,
  usersAtom,
  filteredChatsAtom,
} from '../../model/chat-atoms';

export const useChatStore = () => ({
  chats: useAtomValue(chatsAtom),
  users: useAtomValue(usersAtom),
  filteredChats: useAtomValue(filteredChatsAtom),
});

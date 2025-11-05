import { useAtomValue } from 'jotai';
import {
  showEmptySearchPromptAtom,
  showUserListAtom,
  showUserNotFoundAtom,
  showNoChatsAtom,
  showFilteredChatsAtom,
  showNoFilteredResultsAtom,
  showAllChatsAtom,
} from '../model/chatVisAtoms';
import { UserInterface } from '../types/UserInterface';
import { ChatInterface } from '../types/ChatInterface';
export const useChatVisibility = (
  users: UserInterface[],
  chats: ChatInterface[],
  filteredChats: ChatInterface[]
) => {
  const showEmptySearchPrompt = useAtomValue(showEmptySearchPromptAtom(users));
  const showUserList = useAtomValue(showUserListAtom(users));
  const showUserNotFound = useAtomValue(showUserNotFoundAtom(users));
  const showNoChats = useAtomValue(showNoChatsAtom(chats));
  const showFilteredChats = useAtomValue(showFilteredChatsAtom(filteredChats));
  const showNoFilteredResults = useAtomValue(
    showNoFilteredResultsAtom(filteredChats)
  );
  const showAllChats = useAtomValue(showAllChatsAtom(chats));

  console.log('i am podiras (atom families)');

  return {
    showEmptySearchPrompt,
    showUserList,
    showUserNotFound,
    showNoChats,
    showFilteredChats,
    showNoFilteredResults,
    showAllChats,
  };
};

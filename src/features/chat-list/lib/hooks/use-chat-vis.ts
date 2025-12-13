import { useAtomValue } from 'jotai';
import {
  showEmptySearchPromptAtom,
  showUserListAtom,
  showUserNotFoundAtom,
  showNoChatsAtom,
  showFilteredChatsAtom,
  showNoFilteredResultsAtom,
  showAllChatsAtom,
} from '../../model/chat-vis-atoms';
import { UserInterface, ChatInterface } from '@/shared/types/domain';

export const useChatVisibility = (
  users: UserInterface[],
  chats: ChatInterface[] | undefined,
  filteredChats: ChatInterface[]
) => {
  const showEmptySearchPrompt = useAtomValue(showEmptySearchPromptAtom(users));
  const showUserList = useAtomValue(showUserListAtom(users));
  const showUserNotFound = useAtomValue(showUserNotFoundAtom(users));
  const showNoChats = useAtomValue(showNoChatsAtom(chats || []));
  const showFilteredChats = useAtomValue(showFilteredChatsAtom(filteredChats));
  const showNoFilteredResults = useAtomValue(
    showNoFilteredResultsAtom(filteredChats)
  );
  const showAllChats = useAtomValue(showAllChatsAtom(chats || []));

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

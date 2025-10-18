import { useUiContext } from '@/features/common/contexts';
import { useSearchContext } from '@/features/common/contexts/searchContext';
interface ChatInterface {
  chatId: string;
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastMessage: string;
  lastCreate: string;
  unreadCount: number;
  isRead: boolean;
}

export function useChatListState(
  users: ChatInterface[],
  chats: ChatInterface[],
  filteredChats: ChatInterface[]
) {
  const { searchUser, filter } = useSearchContext();
  const { isAddUserOpen } = useUiContext();
  const isAddingNewUsers = isAddUserOpen;
  const isEmptySearch = searchUser === '';
  const hasUsers = users.length !== 0;
  const hasSearchQuery = searchUser !== '';
  const hasChats = chats.length > 0;
  const hasFilteredChats = filteredChats.length > 0;
  const isFiltering = filter;

  const showEmptySearchPrompt = isAddingNewUsers && isEmptySearch;
  const showUserList = isAddingNewUsers && hasUsers && hasSearchQuery;
  const showUserNotFound = isAddingNewUsers && !hasUsers && hasSearchQuery;

  const showNoChats = !isAddingNewUsers && !hasChats;
  const showFilteredChats =
    !isAddingNewUsers && isFiltering && hasFilteredChats;
  const showNoFilteredResults =
    !isAddingNewUsers && isFiltering && !hasFilteredChats;
  const showAllChats = !isAddingNewUsers && !isFiltering && hasChats;

  return {
    showEmptySearchPrompt,
    showUserList,
    showUserNotFound,
    showNoChats,
    showFilteredChats,
    showNoFilteredResults,
    showAllChats,
  };
}

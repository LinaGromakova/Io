import { ChatListAlt } from './ChatListAlt/ChatListAlt';
import { UserContact } from '@/entities/UserContact';
import { useChatListState } from '../../hooks/useChatListState';
import { useChatListStore } from '../../hooks/useChatListStore';
import { ChatInterface } from '../../types/ChatInterface';
import { useUiContext } from '@/features/common/contexts';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function ChatList() {
  const { user } = useAuth();
  const { chats, users, filteredChats } = useChatListStore(user.userId);
  const { setIsAddUserOpen, toggleBubbleMenu, setIsSidebarOpen } =
    useUiContext();
  const {
    showEmptySearchPrompt,
    showUserList,
    showUserNotFound,
    showNoChats,
    showFilteredChats,
    showNoFilteredResults,
    showAllChats,
  } = useChatListState([], chats, filteredChats);
  return (
    <>
      {showEmptySearchPrompt && <ChatListAlt text="Введите имя пользователя" />}
      {showUserList
        ? users.map((u) => (
            <UserContact
              key={u.userId}
              type="simple"
              {...u}
              currentUserId={user.userId}
              targetUserId={u.userId}
              menuType="contactSimpleWrite"
              newCompanion={u}
              onBubbleMenuOpen={toggleBubbleMenu}
            />
          ))
        : showUserNotFound && (
            <ChatListAlt text="Пользователь не найден" icon={true} />
          )}

      {showNoChats && (
        <ChatListAlt
          text="У вас пока нет чатов"
          icon={true}
          link={{
            onClick: () => setIsAddUserOpen(true),
            linkText: 'Добавить собеседника',
          }}
        />
      )}

      {showFilteredChats &&
        filteredChats.map((chat) => (
          <UserContact
            key={chat.chatId}
            type="details"
            onBubbleMenuOpen={toggleBubbleMenu}
            onSidebarClose={setIsSidebarOpen}
            {...chat}
          />
        ))}

      {showNoFilteredResults && (
        <ChatListAlt text="Пользователь не найден" icon={true} />
      )}

      {showAllChats &&
        chats.map((chat: ChatInterface) => (
          <UserContact
            key={chat.chatId}
            type="details"
            onBubbleMenuOpen={toggleBubbleMenu}
            onSidebarClose={setIsSidebarOpen}
            {...chat}
          />
        ))}
    </>
  );
}

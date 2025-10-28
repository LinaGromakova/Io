import { ChatListAlt } from './ChatListAlt/ChatListAlt';
import { UserContact } from '@/entities/UserContact';
import { useChatListState } from '../../hooks/useChatListState';
import { useChatListStore } from '../../hooks/useChatListStore';
import { ChatInterface } from '../../types/ChatInterface';
import { useUiContext } from '@/features/common/contexts';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { HeaderListLayout } from '../ChatListHeader/ChatListHeader';

export function ChatList() {
  // const { user } = useAuth();
  const user = {
    userId: '5HEzeZ4dB0iA2wJ3NdmvS',
    userName: 'Lina=',
    userImage: '/uploads/avatars/avatar-1759159994251-893137663.jpg',
    onlineStatus: false,
    lastSeen: '2025-10-13T00:49:32.751Z',
    createdAt: '2025-08-27T19:03:13.408Z',
  };
  const { chats, users, filteredChats } = useChatListStore(user?.userId || '');
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
  } = useChatListState(users, chats, filteredChats);

  if (!user || !user.userId) {
    return <div>Loading chats...</div>;
  }
  console.log('Chat List rendered');
  return (
    <>
      <HeaderListLayout></HeaderListLayout>
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

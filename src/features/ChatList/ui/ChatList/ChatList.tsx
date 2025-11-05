import { ChatListAlt } from './ChatListAlt/ChatListAlt';
import { UserContact } from '@/entities/UserContact';
import { ChatInterface } from '../../types/ChatInterface';
import { HeaderListLayout } from '../ChatListHeader/ChatListHeader';
import { useUiActions } from '@/features/interface-state/lib/hooks';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import { useChatStore } from '../../lib/useChatStore';
import { useChatVisibility } from '../../lib/useChatVis';
import { ChatListLoading } from './ChatListLoading/ChatListLoading';

export function ChatList() {
  const { user } = useAuthState();
  const { chats, users, filteredChats } = useChatStore();
  const { toggleAddUser, toggleBubbleMenu, toggleSidebar } = useUiActions();

  const {
    showEmptySearchPrompt,
    showUserList,
    showUserNotFound,
    showNoChats,
    showFilteredChats,
    showNoFilteredResults,
    showAllChats,
  } = useChatVisibility(users, chats, filteredChats);

  if (!user || !user.userId) {
    return <ChatListLoading></ChatListLoading>;
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
            onClick: () => toggleAddUser,
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
            onSidebarClose={toggleSidebar}
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
            onSidebarClose={toggleSidebar}
            {...chat}
          />
        ))}
    </>
  );
}

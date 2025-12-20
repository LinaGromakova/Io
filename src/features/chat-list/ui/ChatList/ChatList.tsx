import { ChatListAlt } from './ChatListAlt/ChatListAlt';
import { UserContact } from '@/entities/user-contact/ui';
import { ChatInterface } from '@/shared/types/domain';
import { HeaderListLayout } from '../ChatListHeader/ChatListHeader';
import { useUiActions } from '@/shared/api/store/lib/hooks';
import { useAuthState } from '@/features/auth/lib/hooks';
import { useChatStore } from '../../lib/hooks';
import { useChatVisibility } from '../../lib/hooks';
import { ChatListLoading } from './ChatListLoading/ChatListLoading';
import { useChatListSockets } from '../../lib/hooks';
import { useModalControls } from '@/features/confirmation/lib/use-modal-state';
import { useParams } from 'next/navigation';
import { deleteChat, startChat } from '@/shared/api/chat';
export function ChatList() {
  const { user } = useAuthState();
  const { chats, users, filteredChats } = useChatStore();
  const { toggleAddUser, toggleBubbleMenu, setSidebar } = useUiActions();
  const { openModal } = useModalControls();
  const params = useParams();
  useChatListSockets();
  const {
    showEmptySearchPrompt,
    showUserList,
    showUserNotFound,
    showNoChats,
    showFilteredChats,
    showNoFilteredResults,
    showAllChats,
  } = useChatVisibility(users, chats, filteredChats);
  const isChatPage = !!params?.id;
  if (!user || !user.userId || user.userId === '' || !chats) {
    return <ChatListLoading isOpen={isChatPage} />;
  }
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
              onBubbleMenuOpen={() => toggleBubbleMenu}
              onMenuAction={() => {
                startChat(user.userId, u.userId);
                toggleAddUser();
              }}
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
            onClick: () => toggleAddUser(),
            linkText: 'Добавить собеседника',
          }}
        />
      )}
      {showFilteredChats &&
        filteredChats.map((chat) => (
          <UserContact
            key={chat.chatId}
            type="details"
            onBubbleMenuOpen={() => toggleBubbleMenu}
            onSidebarClose={() => setSidebar(false)}
            onMenuAction={() => () => deleteChat(chat.chatId)}
            {...chat}
          />
        ))}
      {showNoFilteredResults && (
        <ChatListAlt text="Пользователь не найден" icon={true} />
      )}

      {showAllChats &&
        chats &&
        chats.map((chat: ChatInterface) => (
          <UserContact
            key={chat.chatId}
            type="details"
            onBubbleMenuOpen={() => toggleBubbleMenu}
            onSidebarClose={() => setSidebar(false)}
            onMenuAction={() => {
              openModal({
                modalType: 'deleteChat',
                currentUserId: user.userId,
                targetUserName: chat.userName,
                chatId: chat.chatId,
              });
            }}
            {...chat}
          />
        ))}
    </>
  );
}

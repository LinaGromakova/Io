import Link from 'next/link';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import { BubbleMenu } from '@/entities/BubbleMenu';
import { UserContact } from '@/entities/UserContact';
import { useUiContext } from '@/features/common/contexts/uiContext';
import { useState } from 'react';
import { useModalContext } from '@/features/common/contexts';
import { useInitTargetUser } from '../hooks/useInitTargetUser';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function ChatHeader({ chatId }: { chatId: string }) {
  // const { user } = useAuth();
  const user = {
    userId: '5HEzeZ4dB0iA2wJ3NdmvS',
    userName: 'Lina=',
    userImage: '/uploads/avatars/avatar-1759159994251-893137663.jpg',
    onlineStatus: false,
    lastSeen: '2025-10-13T00:49:32.751Z',
    createdAt: '2025-08-27T19:03:13.408Z',
  };
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const { changeModalView } = useModalContext();
  const { setIsSidebarOpen } = useUiContext();
  const { targetUser } = useInitTargetUser(chatId);
  console.log('Chat Header rendering');
  return (
    <header className="flex items-center px-4 py-2 w-full">
      <Link href="/">
        <ButtonCircle
          actionType="back"
          className="mr-4 hidden max-md:flex"
          handlerClick={() => setIsSidebarOpen(true)}
        ></ButtonCircle>
      </Link>
      <UserContact
        type="header"
        userImage={targetUser.userImage}
        userName={targetUser.userName}
        onlineStatus={targetUser.onlineStatus}
      ></UserContact>
      <ButtonCircle
        actionType="more"
        className="ml-auto"
        handlerClick={() => setIsBubbleMenuOpen(true)}
      ></ButtonCircle>
      <BubbleMenu
        menuType={'contactHeader'}
        visible={isBubbleMenuOpen}
        setVisible={setIsBubbleMenuOpen}
        isBlock={false}
        onClick={(actionType) => {
          changeModalView({
            modalType: actionType,
            currentUserId: user.userId,
            targetUserId: targetUser.userId,
            targetUserName: targetUser.userName,
            chatId: chatId,
          });
        }}
        className="top-18 right-5"
      ></BubbleMenu>
    </header>
  );
}

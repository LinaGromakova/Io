'use client';
import Link from 'next/link';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import { BubbleMenu } from '@/entities/bubble-menu';
import { UserContact } from '@/entities/user-contact/ui';
import { useState } from 'react';
import { useInitTargetUser } from '../../lib/hooks';
import { useSidebar } from '@/shared/api/store/lib/hooks';
import { useAuthState } from '@/features/auth/lib/hooks';
import { useModalControls } from '@/features/confirmation/lib/use-modal-state';
import { ChatHeaderLoading } from './ChatHeaderLoading';
import { useBlackList } from '@/features/blacklist/lib/hooks';

export function ChatHeader({ chatId }: { chatId: string }) {
  const { user } = useAuthState();
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const { openModal } = useModalControls();
  const { setSidebarOpen } = useSidebar();
  const { targetUser } = useInitTargetUser(chatId);
  const { isBlock } = useBlackList(
    user?.userId || '',
    targetUser?.userId || '',
    chatId
  );

  if (!targetUser?.userId || !user?.userId || targetUser?.userId === '') {
    return <ChatHeaderLoading></ChatHeaderLoading>;
  }

  return (
    <header className="flex items-center px-4 py-2 w-full h-14 absolute top-0 bg-background z-50">
      <Link href="/">
        <ButtonCircle
          actionType="back"
          className="mr-4 hidden max-md:flex"
          handlerClick={() => setSidebarOpen(true)}
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
        isBlock={isBlock}
        onClick={(actionType) => {
          openModal({
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

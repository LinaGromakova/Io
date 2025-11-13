import Link from 'next/link';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import { BubbleMenu } from '@/entities/BubbleMenu';
import { UserContact } from '@/entities/UserContact';
import { useState } from 'react';
import { useInitTargetUser } from '../hooks/useInitTargetUser';
import { useSidebar } from '@/features/interface-state/lib/hooks';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import { useModalControls } from '@/features/modal/lib/useModalState';
import { ChatHeaderLoading } from './ChatHeaderLoading';

export function ChatHeader({ chatId }: { chatId: string }) {
  const { user } = useAuthState();

  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const { openModal } = useModalControls();
  const { setSidebar } = useSidebar();
  const { targetUser } = useInitTargetUser(chatId);

  if (!targetUser.userId) {
    return <ChatHeaderLoading></ChatHeaderLoading>;
  }

  console.log('Chat Header rendering');
  return (
    <header className="flex items-center px-4 py-2 w-full">
      <Link href="/">
        <ButtonCircle
          actionType="back"
          className="mr-4 hidden max-md:flex"
          handlerClick={setSidebar(true)}
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

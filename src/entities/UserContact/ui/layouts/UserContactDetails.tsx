import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { UserContactAvatar } from '@/shared/ui/UserContact/UserContactAvatar';
import { BubbleMenu } from '@/entities/BubbleMenu';
import { UserContactMeta } from '@/shared/ui/UserContact';
import { useUserContact } from '../../model/useUserContact';

export interface UserContactDetailsProps {
  chatId: string;
  userId: string;
  userImage: string;
  userName: string;
  onlineStatus: boolean;
  isRead: boolean;
  lastMessage?: string;
  lastCreate: Date | string | number;
  unreadCount: number;
  onBubbleMenuOpen: (
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  onSidebarClose: (arg0: boolean) => void;
}
export function UserContactDetails(props: UserContactDetailsProps) {
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const {
    isActive,
    handleTouchStart,
    handleTouchEnd,
    handleContextMenu,
    handleClick,
  } = useUserContact(
    props.onBubbleMenuOpen,
    isBubbleMenuOpen,
    setIsBubbleMenuOpen,
    props.onSidebarClose,
    props.chatId
  );

  return (
    <Link href={`/${props.chatId}`}>
      <article
        className={clsx(
          'py-3 px-5 relative rounded-2xl flex items-center cursor-pointer duration-300 transition-colors group/user my-2',
          isActive
            ? 'bg-inter/90 hover:bg-inter'
            : 'bg-inter/40 hover:bg-inter/60'
        )}
        onClick={() => {
          handleClick();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onContextMenu={(e) => {
          e.preventDefault();
          if (e.button === 2) {
            handleContextMenu(e);
          }
        }}
      >
        <BubbleMenu
          menuType={'contactSimpleInBlock'}
          visible={isBubbleMenuOpen}
          setVisible={setIsBubbleMenuOpen}
          isBlock={false}
          onClick={() => null}
        ></BubbleMenu>
        <div className="flex items-center w-full justify-between">
          <UserContactAvatar
            image={props.userImage}
            name={props.userName}
            online={props.onlineStatus}
            size="base"
          ></UserContactAvatar>
          <div className="ml-4 flex-1/2 overflow-hidden">
            <p className="font-medium text-lg">{props.userName}</p>
          </div>
          <UserContactMeta
            userName={props.userName}
            isRead={props.isRead}
            isActive={isActive}
            lastCreate={props.lastCreate}
            unreadCount={props.unreadCount}
          ></UserContactMeta>
        </div>
      </article>
    </Link>
  );
}

'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { UserContactAvatar } from '@/shared/ui/UserContact/UserContactAvatar';
import { BubbleMenu } from '@/entities/bubble-menu';
import { UserContactMeta } from '@/shared/ui/UserContact';
import { useUserContact } from '../../lib/hooks/use-user-contact';
import { useRouter } from 'next/navigation';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface UserContactDetailsProps {
  chatId: string;
  userId: string;
  userImage: string | StaticImport | null;
  userName: string;
  onlineStatus: boolean;
  isRead: boolean;
  lastMessage: string;
  lastMessageAt: Date | string | number;
  unreadCount: number;
  onBubbleMenuOpen: () => void;
  onSidebarClose: (arg0: boolean) => void;
  onMenuAction(actionType: string, arg1: { chatId: string }): void;
}
export function UserContactDetails(props: UserContactDetailsProps) {
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const router = useRouter();
  const {
    isActive,
    handleTouchStart,
    handleTouchEnd,
    handleContextMenu,
    handleClick,
  } = useUserContact(
    () => setIsBubbleMenuOpen(!isBubbleMenuOpen),
    () => props.onSidebarClose(true),
    props.chatId
  );

  return (
    <article
      className="relative"
      onClick={() => router.push(`/chat/${props.chatId}`)}
    >
      <div
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
          handleContextMenu(e);
        }}
      >
        <BubbleMenu
          menuType="contactDetails"
          visible={isBubbleMenuOpen}
          setVisible={setIsBubbleMenuOpen}
          isBlock={false}
          onClick={(actionType) =>
            props.onMenuAction?.(actionType, {
              chatId: props.chatId,
            })
          }
          className="right-2 bottom-2"
        ></BubbleMenu>
        <div className="flex items-center w-full justify-between">
          <UserContactAvatar
            image={
              props.userImage ? `http://localhost:5000${props.userImage}` : null
            }
            name={props.userName}
            online={props.onlineStatus}
            size="base"
          ></UserContactAvatar>
          <div className="ml-4 flex-1/2 overflow-hidden">
            <p className="font-medium text-lg truncate">{props.userName}</p>
            <p
              className={clsx(
                'text-md truncate message',
                !isActive && 'opacity-50'
              )}
            >
              {!props.lastMessage
                ? `Поприветствуйте ${props.userName}!`
                : props.lastMessage}
            </p>
          </div>
          {props.lastMessage && (
            <UserContactMeta
              userName={props.userName}
              isRead={props.isRead}
              isActive={isActive}
              lastMessageAt={props.lastMessageAt}
              unreadCount={props.unreadCount}
              lastMessage={props.lastMessage}
            ></UserContactMeta>
          )}
        </div>
      </div>
    </article>
  );
}

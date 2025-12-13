'use client';
import { BubbleMenu } from '@/entities/bubble-menu';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import { UserContactAvatar } from '@/shared/ui/UserContact/UserContactAvatar';
import clsx from 'clsx';
import { useState } from 'react';
import { useUserContact } from '../../lib/hooks/use-user-contact';

export interface UserContactSimpleProps {
  onMenuAction(
    actionType: string,
    arg1: { currentUserId: string; targetUserId: string }
  ): void;
  currentUserId: string;
  targetUserId: string;
  userName: string;
  userImage: string;
  menuType: 'contactSimpleWrite' | 'contactSimpleInBlock';
  newCompanion?: User;
  onBubbleMenuOpen: () => void;
}

interface User {
  userId: string;
  userImage: string;
  userName: string;
  onlineStatus: boolean;
}
export function UserContactSimple(props: UserContactSimpleProps) {
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const { handleContextMenu } = useUserContact(() =>
    props.onBubbleMenuOpen?.()
  );
  return (
    <article
      className={clsx(
        `py-3 px-5 relative flex items-center cursor-pointer
         rounded-2xl duration-300 transition-colors justify-between my-2`,
        isBubbleMenuOpen
          ? 'bg-inter/90 hover:bg-inter'
          : 'bg-inter/40 hover:bg-inter/60'
      )}
      onContextMenu={(e) => {
        if (props.menuType === 'contactSimpleInBlock') {
          handleContextMenu(e);
        }
      }}
      onClick={() => setIsBubbleMenuOpen(true)}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-between">
          <UserContactAvatar
            image={
              props.userImage ? `http://localhost:5000${props.userImage}` : null
            }
            name={props.userName}
            size="base"
          ></UserContactAvatar>
        </div>
        <div className="ml-4 overflow-hidden">
          <p className="font-medium text-lg truncate w-30">{props.userName}</p>
        </div>
      </div>
      <div className="relative">
        {props.menuType === 'contactSimpleInBlock' && (
          <ButtonCircle
            actionType="more"
            handlerClick={() => setIsBubbleMenuOpen(true)}
          ></ButtonCircle>
        )}
        <BubbleMenu
          menuType={props.menuType}
          visible={isBubbleMenuOpen}
          setVisible={setIsBubbleMenuOpen}
          isBlock={false}
          onClick={(actionType) =>
            props.onMenuAction?.(actionType, {
              currentUserId: props.currentUserId,
              targetUserId: props.targetUserId,
            })
          }
          className="right-0"
        ></BubbleMenu>
      </div>
    </article>
  );
}

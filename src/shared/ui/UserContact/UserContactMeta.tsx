import { parseValidDate } from '@/shared/lib/dates';
import clsx from 'clsx';
import {
  IoCheckmarkDoneOutline as MarkDoneIcon,
  IoCheckmarkOutline as MarkOutlineIcon,
} from 'react-icons/io5';

interface UserContactMetaProps {
  userName: string;
  lastMessage: string;
  isRead: boolean;
  isActive: boolean;
  lastMessageAt: Date | string | number;
  unreadCount: number;
}

export function UserContactMeta({
  isRead,
  isActive,
  lastMessageAt,
  unreadCount,
}: UserContactMetaProps) {
  const time = parseValidDate(lastMessageAt);
  return (
    <>
      <div className="flex justify-center flex-col">
        <div className="flex">
          {(isRead && <MarkDoneIcon className="mr-1"></MarkDoneIcon>) || (
            <MarkOutlineIcon
              className={clsx('mr-1', !isActive && 'opacity-50')}
            ></MarkOutlineIcon>
          )}
          <span className={clsx('text-sm', !isActive && 'opacity-50')}>
            {time}
          </span>
        </div>

        <div
          className={clsx(
            isActive && unreadCount !== 0
              ? 'bg-white text-accent'
              : 'text-white',
            unreadCount == 0 && 'invisible',
            'w-7 h-7 rounded-full bg-accent pt-px font-bold ml-auto mt-1 text-sm flex items-center justify-center'
          )}
        >
          {unreadCount}
        </div>
      </div>
    </>
  );
}

import { IoCheckmarkDoneOutline as MarkDoneIcon } from 'react-icons/io5';
import { IoCheckmarkOutline as MarkOutlineIcon } from 'react-icons/io5';
import clsx from 'clsx';
import { useGlobalContext } from '@/features/common/globalContext';

interface MessageProps {
  content: string;
  created_at: Date;
  is_read: boolean;
  readonly sender_id: string;
  className?: string;
}

export function UserMessage({
  content,
  created_at,
  is_read,
  sender_id,
  className,
}: MessageProps) {
  const { user, theme } = useGlobalContext();
  function getValidDate(value: number): string {
    if (value > 9) {
      return '' + value;
    } else {
      return '0' + value;
    }
  }

  const timePush =
    getValidDate(new Date(created_at).getHours()) +
    ':' +
    getValidDate(new Date(created_at).getMinutes());
  return (
    <div className="flex flex-col ">
      <article
        className={clsx(
          `max-w-96 min-w-18 inline rounded-xl p-4 relative mb-3 before:bottom-2.5 before:absolute break-all border-foreground/40
        before:content-[''] before:block text-white`,
          className,
          sender_id === user.id
            ? ` ml-auto  bg-gradient-to-l from-accent-shadow/70 to-accent`
            : ` mr-auto bg-gradient-to-r from-accent-shadow/70 to-accent`
        )}
      >
        <p className="text-lg message pb-0.5">{content}</p>
        <div className="absolute bottom-0.5 right-0.5 flex">
          <span className="text-xs opacity-70">{timePush}</span>
          <span className="align-text-bottom mx-1">
            {(is_read && <MarkDoneIcon></MarkDoneIcon>) || (
              <MarkOutlineIcon className="opacity-70"></MarkOutlineIcon>
            )}
          </span>
        </div>
      </article>
    </div>
  );
}

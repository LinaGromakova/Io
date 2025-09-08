import { IoCheckmarkDoneOutline as MarkDoneIcon } from 'react-icons/io5';
import { IoCheckmarkOutline as MarkOutlineIcon } from 'react-icons/io5';
import clsx from 'clsx';
import { useGlobalContext } from '@/features/common/globalContext';

interface MessageProps {
  content: string;
  created_at: Date;
  is_read: boolean;
  readonly sender_id: 'string';
  className?: string;
}

export function UserMessage({
  content,
  created_at,
  is_read,
  sender_id,
  className,
}: MessageProps) {
  const { user } = useGlobalContext();
  const timePush =
    new Date(created_at).getHours() + ':' + new Date(created_at).getMinutes();
  return (
    <div className="flex flex-col">
      <article
        className={clsx(
          `max-w-96 min-w-30 inline rounded-xl p-4 relative mb-3 before:bottom-2.5 before:absolute break-all
        before:content-[''] before:block`,
          className,
          sender_id === user.id
            ? `text-white bg-gradient-to-l ml-auto from-accent-shadow to-accent/80  before:-right-5
          before:border-r-transparent before:border-r-20 before:border-b-accent-shadow
          before:border-t-transparent before:border-y-20 border-l-0`
            : `bg-background before:-left-5
           before:border-l-transparent before:border-l-20
           before:border-b-background before:border-t-transparent
            before:border-y-20 border-r-0 mr-auto`
        )}
      >
        <span className="text-md">{content}</span>
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

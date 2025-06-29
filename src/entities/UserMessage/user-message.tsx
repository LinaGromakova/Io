import { JSX } from 'react';
import { IoCheckmarkDoneOutline as MarkDoneIcon } from 'react-icons/io5';
import { IoCheckmarkOutline as MarkOutlineIcon } from 'react-icons/io5';
import clsx from 'clsx';

interface MessageProps {
  message: string;
  atPush: string;
  read: boolean;
  readonly sender: 'YOU' | 'ANOTHER';
  className?: string;
}

export function UserMessage({
  message,
  atPush,
  read,
  sender,
  className,
}: MessageProps): JSX.Element {
  return (
    <article
      className={clsx(
        `max-w-70  min-w-8 rounded-xl p-4 relative mb-3 last:before:bottom-2.5  last:before:absolute 
        last:before:content-[''] last:before:block`,
        className,
        sender === 'YOU'
          ? `bg-gradient-to-l from-accent-shadow to-accent/80 ml-auto last:before:-right-5
          last:before:border-r-transparent last:before:border-r-20 last:before:border-b-accent-shadow
          last:before:border-t-transparent last:before:border-y-20 last:border-l-0`
          : `bg-background last:before:-left-5
          last:before:border-l-transparent last:before:border-l-20
          last:before:border-b-background last:before:border-t-transparent
           last:before:border-y-20 last:border-r-0`
      )}
    >
      <span className='text-md'>{message}</span>
      <div className='absolute bottom-0.5 right-0.5 flex'>
        <span className='text-xs opacity-70'>{atPush}</span>
        <span className='align-text-bottom mx-1'>
          {(read && <MarkDoneIcon></MarkDoneIcon>) || (
            <MarkOutlineIcon className='opacity-70'></MarkOutlineIcon>
          )}
        </span>
      </div>
    </article>
  );
}

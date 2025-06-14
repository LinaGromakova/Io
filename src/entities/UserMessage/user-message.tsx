import { JSX } from 'react';
import { IoCheckmarkDoneOutline as MarkDoneIcon } from 'react-icons/io5';
import { IoCheckmarkOutline as MarkOutlineIcon } from 'react-icons/io5';
import clsx from 'clsx';

interface MessageProps {
  message: string;
  atPush: string;
  read: boolean;
  sender: 'YOU' | 'ANOTHER';
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
        `max-w-70  min-w-8 rounded-xl text-white p-4 relative mb-3 last:before:bottom-2 
        `,
        className,
        sender === 'YOU'
          ? `bg-slate-700 ml-auto last:before:content-[''] last:before:block last:before:absolute last:before:-right-6
          last:before:border-r-transparent last:before:border-r-24 last:before:border-b-slate-400
        last: before:border-t-transparent last:before:border-y-24 last:border-l-0`
          : `bg-orange-400 last:before:content-[''] last:before:block last:before:absolute last:before:-left-6
          last:before:border-l-transparent last:before:border-l-24 
          last:before:border-b-amber-700
        last: before:border-t-transparent last:before:border-y-24 last:border-r-0`
      )}
    >
      <span className='text-md'>{message}</span>
      <div className='absolute bottom-0.5 right-0.5 flex'>
        <span className='text-xs text-white/30'>{atPush}</span>
        <span className='align-text-bottom mx-1'>
          {(read && <MarkDoneIcon></MarkDoneIcon>) || (
            <MarkOutlineIcon className='text-white/50'></MarkOutlineIcon>
          )}
        </span>
      </div>
    </article>
  );
}

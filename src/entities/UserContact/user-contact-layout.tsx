import { JSX } from 'react';
import { IoCheckmarkDoneOutline as MarkDoneIcon } from 'react-icons/io5';
import { IoCheckmarkOutline as MarkOutlineIcon } from 'react-icons/io5';
import clsx from 'clsx';

interface UserContactProps {
  image?: string;
  name: string;
  online: boolean;
  lastMessage: string;
  lastAtCreate: string;
  read: boolean;
  countMessage: number;
}

export function UserContactLayout(props: UserContactProps): JSX.Element {
  const { image, name, online, lastMessage, lastAtCreate, read, countMessage } = props;
  return (
    <article className='py-3 px-5 bg-slate-800 flex text-white items-center justify-between rounded-2xl hover:bg-slate-700'>
      <div className='flex  items-center'>
        <div className='w-16 h-16 relative bg-slate-600 rounded-full'>
          {(image && (
            <img src={image} alt={name} className='w-full object-cover rounded-full'></img>
          )) || <p className='text-center text-4xl font-bold mt-1.5'>{name.slice(0, 1)}</p>}

          {online && (
            <div className='w-4 h-4 bg-green-400 absolute bottom-1 right-2 rounded-full border-2 border-slate-800'></div>
          )}
        </div>
        <div className='ml-4'>
          <p className='font-medium text-lg'>{name}</p>
          <p className='text-white/60 text-md'>{lastMessage}</p>
        </div>
      </div>
      <div>
        <div className='flex items-center'>
          {(read && <MarkDoneIcon className='mr-1 text-amber-500'></MarkDoneIcon>) || (
            <MarkOutlineIcon className='mr-1 text-white/40'></MarkOutlineIcon>
          )}
          <span className='text-sm text-white/40'>{lastAtCreate}</span>
        </div>
        <div
          className={clsx(
            'w-6 h-6 rounded-full font-bold ml-auto text-center mt-1',
            countMessage === 0 ? 'bg-transparent' : 'bg-amber-500'
          )}
        >
          {countMessage !== 0 && countMessage}
        </div>
      </div>
    </article>
  );
}

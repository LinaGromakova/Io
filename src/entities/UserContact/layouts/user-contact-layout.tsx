import { JSX } from 'react';
import { IoCheckmarkDoneOutline as MarkDoneIcon } from 'react-icons/io5';
import { IoCheckmarkOutline as MarkOutlineIcon } from 'react-icons/io5';
import clsx from 'clsx';

import { UserContactProps } from '../interfaces/layout-props';

export function UserContactLayout(props: UserContactProps): JSX.Element {
  return (
    <article
      className='py-3 px-5 interface flex  items-center cursor-pointer
    justify-between rounded-2xl duration-300 transition-colors hover:bg-interactive'
    >
      <div className='flex items-center'>
        <div className='w-16 h-16 relative bg-accent rounded-full flex items-center justify-center'>
          {(props.image && (
            <img
              src={props.image}
              alt={props.name}
              className='w-full h-full object-cover rounded-full'
            ></img>
          )) || (
            <p className='text-center text-athens-gray/70 text-3xl font-bold align-super'>
              {props.name.slice(0, 1).toLocaleUpperCase()}
            </p>
          )}

          {props.online && (
            <div className='w-4 h-4 bg-green absolute bottom-1 right-2 rounded-full border-2 border-athens-gray'></div>
          )}
        </div>
        <div className='ml-4'>
          <p className='font-medium text-lg'>{props.name}</p>
          <p className='text-accent text-md'>{props.lastMessage}</p>
        </div>
      </div>
      <div>
        <div className='flex items-center'>
          {(props.read && <MarkDoneIcon className='mr-1 color-accent'></MarkDoneIcon>) || (
            <MarkOutlineIcon className='mr-1 text-accent '></MarkOutlineIcon>
          )}
          <span className='text-sm text-accent/70 '>{props.lastAtCreate}</span>
        </div>
        <div
          className={clsx(
            'w-6 h-6 rounded-full font-bold ml-auto text-center mt-1',
            props.countMessage === 0 ? 'bg-transparent' : 'bg-accent text-athens-gray pt-px'
          )}
        >
          {props.countMessage !== 0 && props.countMessage}
        </div>
      </div>
    </article>
  );
}

import { JSX } from 'react';
import { IoCheckmarkDoneOutline as MarkDoneIcon } from 'react-icons/io5';
import { IoCheckmarkOutline as MarkOutlineIcon } from 'react-icons/io5';
import clsx from 'clsx';

import { UserContactProps } from '../interfaces/layout-props';

export function UserContactLayout(props: UserContactProps): JSX.Element {
  return (
    <article className='py-3 px-5 relative flex items-center cursor-pointer rounded-2xl duration-300 transition-colors hover:bg-inter group/user'>
      <div className='flex items-center w-full justify-between'>
        <div className='w-14 h-14 relative bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75% rounded-full flex items-center justify-center'>
          {(props.image && (
            <img
              src={props.image}
              alt={props.name}
              className='w-full h-full object-cover rounded-full'
            ></img>
          )) || (
            <p className='text-center text-3xl font-bold text-white'>
              {props.name.slice(0, 1).toLocaleUpperCase()}
            </p>
          )}

          {props.online && (
            <div className='w-4 h-4 bg-accent absolute bottom-0 right-1 border-background rounded-full border-2 duration-300 transition-colors group-hover/user:border-inter'></div>
          )}
        </div>
        <div className='ml-4 flex-1/2 overflow-hidden'>
          <p className='font-medium text-lg'>{props.name}</p>
          <p className='opacity-50 text-md truncate '>{props.lastMessage}</p>
        </div>
    
        <div className='flex justify-center flex-col'>
          <div className='flex'>
             {(props.read && <MarkDoneIcon className='mr-1  '></MarkDoneIcon>) || (
            <MarkOutlineIcon className='mr-1  opacity-50 '></MarkOutlineIcon>
          )}
          <span className='text-sm opacity-50 '>{props.lastAtCreate}</span>
          </div>
         
           <div
          className={clsx(
            'w-6 h-6 rounded-full font-bold ml-auto text-center mt-1 text-white',
            props.countMessage === 0 ? 'bg-transparent' : 'bg-accent pt-px'
          )}
        >
          {props.countMessage !== 0 && props.countMessage}
        </div>
        </div>
       
      </div>
    </article>
  );
}

import { JSX } from 'react';
import { UserContactProps } from '../interfaces/layout-props';

export function UserContactCurrentLayout(props: UserContactProps): JSX.Element {
  return (
    <article
      className='interface flex items-center 
    justify-between'
    >
      <div className='flex items-center'>
        <div className='w-12 h-12 relative bg-accent  rounded-full flex items-center justify-center'>
          {(props.image && (
            <img
              src={props.image}
              alt={props.name}
              className='w-full h-full object-cover rounded-full'
            ></img>
          )) || (
            <p className='text-center opacity-70 text-3xl font-bold align-super'>
              {props.name.slice(0, 1).toLocaleUpperCase()}
            </p>
          )}
        </div>
        <div className='ml-4'>
          <p className='font-bold text-xl'>{props.name}</p>
          {(props.online && (
            <p
              className='
         text-sm opacity-70'
            >
              online
            </p>
          )) || <p className='opacity-50 text-sm'>offline</p>}
        </div>
      </div>
    </article>
  );
}

'use client';

import { JSX } from 'react';
import { ButtonIcons } from './constants/button-icon';

type ButtonProps = {
  type: 'SEARCH' | 'MESSAGE';
  handlerClick?: () => void;
};

export function LayoutButtonCircle(props: ButtonProps): JSX.Element {
  const Icon: JSX.Element = ButtonIcons[props?.type];
  return (
    <button
      type='button'
      className='bg-slate-800 duration-300 cursor-pointer flex justify-center items-center
       text-white rounded-full h-7 w-7 text-sm
        hover:bg-slate-700 focus:bg-slate-700 disabled:bg-slate-400'
      onClick={() => props.handlerClick}
    >
      {Icon}
    </button>
  );
}

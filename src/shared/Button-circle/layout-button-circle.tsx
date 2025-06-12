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
      className='bg-slate-700 duration-300 cursor-pointer flex justify-center items-center
       text-white rounded-full h-9 w-9 text-sm
        hover:bg-slate-600 focus:bg-slate-600 disabled:bg-slate-400'
      onClick={() => props.handlerClick}
    >
      {Icon}
    </button>
  );
}

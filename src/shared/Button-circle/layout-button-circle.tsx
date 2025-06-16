'use client';

import { JSX } from 'react';
import { ButtonIcons } from './constants/button-icon';
import clsx from 'clsx';

type ButtonProps = {
  type: 'SEARCH' | 'MESSAGE' | 'CREATE';
  handlerClick?: () => void;
  className?: string;
};

export function LayoutButtonCircle(props: ButtonProps): JSX.Element {
  const Icon: JSX.Element = ButtonIcons[props?.type];
  return (
    <button
      type='button'
      className={clsx(
        `bg-slate-700 duration-300 cursor-pointer flex justify-center items-center
       text-white rounded-full h-9 w-9 text-md
        hover:bg-slate-600 focus:bg-slate-600 disabled:bg-slate-400`,
        props.className
      )}
      onClick={() => props.handlerClick}
    >
      {Icon}
    </button>
  );
}

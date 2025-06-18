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
        `interactive-el duration-300 cursor-pointer flex justify-center items-center color-accent
        hover:bg-interactive-el-hover
        font-bold rounded-full h-9 w-9 text-md`,
        props.className,
        props.type === 'CREATE' && 'bg-accent hover:bg-accent'
      )}
      onClick={() => props.handlerClick}
    >
      {Icon}
    </button>
  );
}

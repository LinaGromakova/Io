'use client';

import { JSX } from 'react';
import { ButtonIcons } from './constants/button-icon';
import clsx from 'clsx';

type ButtonProps = {
  type: 'SEARCH' | 'MESSAGE' | 'CREATE' | 'BACK' | 'LIGHT' | 'DARK';
  handlerClick?: () => string;
  className?: string;
};

export function LayoutButtonCircle(props: ButtonProps): JSX.Element {
  const Icon: JSX.Element = ButtonIcons[props?.type];
  return (
    <button
      type="button"
      className={clsx(
        `bg-inter duration-300 cursor-pointer flex justify-center items-center 
        font-bold rounded-full h-9 w-9 text-md`,
        props.className,
        props.type === 'CREATE' &&
          'bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75% text-white hover:to-accent-shadow/95'
      )}
      onClick={() => props.handlerClick()}
    >
      {Icon}
    </button>
  );
}

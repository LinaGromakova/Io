'use client';
import React, { JSX } from 'react';
import { ButtonIcons } from './constants/button-icon';
import clsx from 'clsx';

type ButtonProps = {
  type:
    | 'SEARCH'
    | 'MESSAGE'
    | 'CREATE'
    | 'BACK'
    | 'OPTIONS'
    | 'PHOTO_ADD'
    | 'MORE';
  children?: React.ReactNode;
  handlerClick: () => void;
  className?: string;
};

export function LayoutButtonCircle(props: ButtonProps) {
  const Icon: JSX.Element = ButtonIcons[props?.type];
  return (
    <button
      type="button"
      className={clsx(
        `duration-300 cursor-pointer flex justify-center items-center 
        font-bold rounded-full h-9 w-9  text-xl  overflow-hidden hover:bg-inter `,
        props.className,
        props.type === 'MESSAGE'
          ? 'border border-foreground/20 w-10 h-10 min-h-10 min-w-10 bg-inter hover:text-foreground/80 hover:border-foreground/50'
          : 'bg-inter/50',
        props.type === 'CREATE' &&
          `bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75% text-white 
          hover:scale-105
          `
      )}
      onClick={() => props.handlerClick()}
    >
      {Icon}
      {props.children}
    </button>
  );
}

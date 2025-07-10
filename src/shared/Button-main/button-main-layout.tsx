'use client';
import clsx from 'clsx';
import { JSX } from 'react';
import { ButtonMainStyles } from './constants/button-styles';

interface ButtonMainProps {
  type: 'log in' | 'registration' | 'submit';
  className?: string;
  handlerClick?: () => void;
}

export function ButtonMain(props: ButtonMainProps): JSX.Element {
  const { style, icon } = ButtonMainStyles[props.type];
  return (
    <button
      type='button'
      onClick={() => props.handlerClick}
      className={clsx(
        `cursor-pointer font-medium  text-white
        px-4 py-2 h-9 rounded-sm w-full capitalize
        hover:scale-105 duration-300 focus:outline-0 
        my-4 flex items-center justify-center`,
        style,
        props.className
      )}
    >
      {icon}
      <span>{props.type}</span>
    </button>
  );
}

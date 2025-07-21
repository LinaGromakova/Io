'use client';
import clsx from 'clsx';
import { JSX } from 'react';
import { ButtonMainStyles } from './constants/button-styles';

interface ButtonMainProps {
  type: 'log in' | 'registration' | 'submit';
  className?: string;
  handlerClick?: (e) => void;
  disabled?: boolean;
}

export function ButtonMain(props: ButtonMainProps): JSX.Element {
  const { style, icon } = ButtonMainStyles[props.type];
  return (
    <button
      type="submit"
      onClick={(e) => props.handlerClick(e)}
      disabled={props?.disabled}
      className={clsx(
        `cursor-pointer font-medium  text-white
        px-4 py-2 h-9 rounded-sm w-full capitalize
        hover:scale-105 duration-300 focus:outline-0 
        my-4 flex items-center justify-center
        disabled:bg-gradient-to-r disabled:from-gray-600
         disabled:via-gray-400 disabled:to-slate-200 disabled:opacity-75 disabled:hover:scale-100 disabled:cursor-auto
        `,
        style,
        props.className
      )}
    >
      {icon}
      <span>{props.type}</span>
    </button>
  );
}

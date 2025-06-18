import { JSX } from 'react';
import clsx from 'clsx';
import { stylePurpose } from './constants/input-styles';

interface InputProps {
  purpose: 'FORM' | 'MESSAGE';
  name: string;
  type: string;
  className?: string;
}

export function InputMain(props: InputProps): JSX.Element {
  const style = stylePurpose[props.purpose].style;
  return (
    <input
      type={props.type}
      name={props.name}
      autoComplete='off'
      className={clsx(
        `interactive-el 
        font-medium text-sm py-2 px-4
        duration-300 transition-[background-color]
         min-w-fit`,
        style,
        props.className
      )}
    />
  );
}

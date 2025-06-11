import { JSX } from 'react';
import clsx from 'clsx';
import { stylePurpose } from './constants/input-styles';

interface InputProps {
  purpose: 'FORM' | 'MESSAGE';
  name: string;
  type: string;
}

export function InputMain(props: InputProps): JSX.Element {
  const style = stylePurpose[props.purpose].style;
  return (
    <input
      type={props.type}
      name={props.name}
      className={clsx(
        `bg-slate-800 text-white text-sm py-2 px-4
       w-full duration-300 transition-[background-color]
        hover:bg-slate-700`,
        style
      )}
    />
  );
}

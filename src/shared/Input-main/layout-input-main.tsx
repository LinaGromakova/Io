import { JSX } from 'react';
import clsx from 'clsx';
import { stylePurpose } from './constants/input-styles';

interface InputProps {
  type?: string;
  purpose: 'FORM' | 'MESSAGE';
}

export function InputLayoutMain(props: InputProps): JSX.Element {
  const style = stylePurpose[props.purpose].style;
  return (
    <input
      type={props.type}
      className={clsx(
        `bg-slate-800 text-cyan-50 text-sm py-2 px-4
       w-full duration-300 transition-[background-color]
        hover:bg-slate-700`,
        style
      )}
    />
  );
}

import { JSX, useState } from 'react';
import clsx from 'clsx';
import { stylePurpose } from './constants/input-styles';
import { IoMdEye as IconInvisible } from 'react-icons/io';
import { IoMdEyeOff as IconVisible } from 'react-icons/io';

interface InputProps {
  purpose: 'FORM' | 'MESSAGE';
  name: string;
  type: string;
  label: string;
  className?: string;
  placeholder: string;
  category?: string;
  message?: string;
  pattern?: RegExp;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  valid?: boolean;
  changeHandler?: (e) => void;
}

export function InputMain(props: InputProps): JSX.Element {
  const [visible, setVisible] = useState(true);
  const [inputType, setInputType] = useState('password');
  const style = stylePurpose[props.purpose].style;

  function handlerVisibleClick() {
    setVisible(!visible);
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  }

  return (
    <div className="relative">
      <input
        {...props}
        onChange={(e) => props.changeHandler(e)}
        type={props.category === 'password' ? inputType : props.type}
        className={clsx(
          `bg-inter
        font-medium text-sm py-2 px-4
        duration-300 transition-[background-color]
         `,
          style,
          props.className,
          { 'focus:valid:outline-green-400/70': props.valid },
          { 'focus:outline-red-500/70': !props.valid }
        )}
      />
      {props.category === 'password' && (
        <button
          type="button"
          onClick={() => handlerVisibleClick()}
          className="cursor-pointer absolute text-xl opacity-50 right-2 top-4 hover:opacity-90 duration-500"
        >
          {visible ? (
            <IconVisible></IconVisible>
          ) : (
            <IconInvisible></IconInvisible>
          )}
        </button>
      )}
      {props.purpose === 'FORM' && !props.valid && (
        <span className="text-xs mt-3 block">{props?.message}</span>
      )}
    </div>
  );
}

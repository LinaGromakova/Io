import React, { Ref, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { stylePurpose } from './constants/input-styles';
import { IoMdEye as IconInvisible } from 'react-icons/io';
import { IoMdEyeOff as IconVisible } from 'react-icons/io';
import { useGlobalContext } from '@/features/common/globalContext';

interface InputProps {
  inputRef?: Ref<HTMLInputElement>;
  purpose: 'FORM' | 'MESSAGE' | 'FILTER';
  name: string;
  type: string;
  label?: string;
  value: string;
  className?: string;
  placeholder: string;
  category?: string;
  message?: string;
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  valid?: boolean;
  onKeyDownHandler: (e: React.KeyboardEvent) => void;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: (value: string) => void;
}

export function InputMain(props: InputProps) {
  const [visible, setVisible] = useState(true);
  const [inputType, setInputType] = useState('password');
  const style = stylePurpose[props.purpose].style;
  const { addNewUsersOpen } = useGlobalContext();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (addNewUsersOpen) {
      inputRef?.current?.focus();
    }
  }, [addNewUsersOpen]);
  function handlerVisibleClick() {
    setVisible(!visible);
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  }

  return (
    <>
      <input
        {...props}
        ref={props.purpose === 'MESSAGE' ? props.inputRef : inputRef}
        autoComplete="off"
        value={props.value}
        onChange={(e) => props.changeHandler(e)}
        onKeyUp={(e) => {
          if (props.purpose === 'MESSAGE') {
            if (e.key === 'Enter') {
              props.sendMessage(props.value);
            }
          }
        }}
        type={props.category === 'password' ? inputType : props.type}
        onKeyDown={(e) => {
          if (props.purpose === 'FORM') {
            props.onKeyDownHandler(e);
          }
        }}
        className={clsx(
          `bg-inter placeholder:text-foreground/50
        font-medium text-sm py-2 px-4 transition-colors
        duration-300
         `,
          style,
          props.className,
          props.purpose === 'FORM' && {
            'focus:valid:outline-green-400/70': props.valid,
          },
          props.purpose === 'FORM' && {
            'focus:outline-red-500/70': !props.valid,
          }
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
        <span className="text-xs mt-3 block">{props.message}</span>
      )}
    </>
  );
}

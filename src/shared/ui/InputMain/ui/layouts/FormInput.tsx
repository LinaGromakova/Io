import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { InvisibleIcon, VisibleIcon } from '../../assets';

interface FormInterface {
  login: string;
  userName: string;
  password: string;
  duplicate: string;
  [key: string]: string;
}
export type FormInputProps = {
  type: string;
  label: string;
  value: string;
  className?: string;
  placeholder: string;
  message: string;
  maxLength: number;
  minLength: number;
  required: boolean;
  valid: boolean;
  setState: React.Dispatch<React.SetStateAction<FormInterface>>;
};

export function FormInput(props: FormInputProps) {
  const [visible, setVisible] = useState(true);
  const [inputType, setInputType] = useState('password');
  const inputRef = useRef<HTMLInputElement>(null);

  function handlerVisibleClick() {
    setVisible(!visible);
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  }
  function handlerInput(
    e: { target: { value: string; name: string } },
    setState: React.Dispatch<React.SetStateAction<FormInterface>>
  ) {
    const value = e.target.value;
    const name = e.target.name;
    return setState((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <input
        {...props}
        ref={inputRef}
        autoComplete="off"
        value={props.value}
        onChange={(e) => handlerInput(e, props.setState)}
        type={props.type === 'password' ? inputType : props.type}
        onKeyDown={(e: { key: string; preventDefault: () => void }) =>
          e.key === ' ' && e.preventDefault()
        }
        className={clsx(
          props.className,
          'rounded-md w-full focus:outline-1  focus:outline-offset-6 mt-2 focus:invalid:outline-red-500/70',
          {
            'focus:valid:outline-green-400/70': props.valid,
          },
          {
            'focus:outline-red-500/70': !props.valid,
          }
        )}
      />
      {props.type === 'password' && (
        <button
          type="button"
          onClick={() => handlerVisibleClick()}
          className="cursor-pointer absolute text-xl opacity-50 right-2 top-4 hover:opacity-90 duration-500 "
        >
          {visible ? (
            <VisibleIcon></VisibleIcon>
          ) : (
            <InvisibleIcon></InvisibleIcon>
          )}
        </button>
      )}
      {!props.valid && (
        <span className="text-xs mt-3 block opacity-50 ">{props.message}</span>
      )}
    </>
  );
}

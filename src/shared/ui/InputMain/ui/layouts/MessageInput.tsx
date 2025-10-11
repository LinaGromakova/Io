import clsx from 'clsx';
import React, { Ref } from 'react';

export type MessageInputProps = {
  inputRef: Ref<HTMLInputElement>;
  name: string;
  type: string;
  value: string;
  className?: string;
  placeholder: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: (value: string) => void;
};

export function MessageInput(props: MessageInputProps) {
  return (
    <>
      <input
        {...props}
        ref={props.inputRef}
        autoComplete="off"
        value={props.value}
        onChange={(e) => props.changeHandler(e)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            props.sendMessage(props.value);
          }
        }}
        className={clsx(
          'border border-foreground/20 outline-none max-md:w-full max-md:rounded-none focus:border-foreground/50 rounded-3xl h-10 pr-10 w-full pl-10 message',
          props.className
        )}
      />
    </>
  );
}

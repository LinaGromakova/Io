import clsx from 'clsx';
import React, { Ref, useEffect, useRef } from 'react';

export type FilterInputProps = {
  inputRef?: Ref<HTMLInputElement>;
  name: string;
  type: string;
  value: string;
  className?: string;
  placeholder: string;
  adding: boolean;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FilterInput(props: FilterInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (props.adding) {
      inputRef?.current?.focus();
    }
  }, [props.adding]);

  return (
    <>
      <input
        {...props}
        ref={inputRef}
        autoComplete="off"
        value={props.value}
        onChange={(e) => props.changeHandler(e)}
        className={clsx(
          props.className,
          `focus:outline-1 focus:outline-accent focus:text-accent focus:placeholder:text-accent
             duration-300 border-none  w-full rounded-3xl max-sm:w-full block max-sm:max-w-none min-w-0 pl-12`,
          props.adding &&
            'input-active outline-2 outline-accent text-accent  duration-300'
        )}
      />
    </>
  );
}

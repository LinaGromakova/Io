import React from 'react';

interface InterfaceEditInputName {
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export function EditInputName({ value, setState }: InterfaceEditInputName) {
  return (
    <input
      className="border-b border-foreground/50 placeholder:text-foreground/50 duration-300 
      focus:outline-0 focus:border-foreground/80 focus:placeholder:text-foreground/80 p-1 w-[140px] block"
      value={value}
      onChange={(e) => {
        if (e.target.value.length === 32) {
          return;
        }
        setState(e.target.value.trim());
      }}
      type="text"
      minLength={2}
      maxLength={32}
      placeholder="Новое имя"
    />
  );
}

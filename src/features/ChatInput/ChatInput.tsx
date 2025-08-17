'use client';
import { FaTelegramPlane as MessageIcon } from 'react-icons/fa';
import { JSX } from 'react';
import { InputMain } from '@/shared/Input-main/layout-input-main';
export function ChatInput(): JSX.Element {
  return (
    <form
      action="#"
      onSubmit={(e) => e.preventDefault()}
      className="absolute px-2 py-4 flex justify-center w-full
       max-md:py-0 max-md:px-0
       bottom-15"
    >
      <div className="relative w-8/12 max-md:w-full">
        <InputMain
          type="text"
          purpose="MESSAGE"
          placeholder="Сообщение..."
          name="chat"
          className=" rounded-3xl h-10 pr-10 w-full"
        ></InputMain>
        <MessageIcon className="absolute top-3 text-base text-foreground/50 right-3"></MessageIcon>
      </div>
    </form>
  );
}

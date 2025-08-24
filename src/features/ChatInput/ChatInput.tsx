'use client';
import { FaTelegramPlane as MessageIcon } from 'react-icons/fa';
import { InputMain } from '@/shared/Input-main/layout-input-main';
interface ChatInputProps {
  value: string;
}
export function ChatInput(props: ChatInputProps) {
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
          changeHandler={(e) => console.log(e)}
          type="text"
          value={props.value}
          purpose="MESSAGE"
          placeholder="Сообщение..."
          name="chat"
          className=" rounded-3xl h-10 pr-10 w-full"
          onKeyDownHandler={() => null}
        ></InputMain>
        <MessageIcon className="absolute top-3 text-base text-foreground/50 right-3"></MessageIcon>
      </div>
    </form>
  );
}

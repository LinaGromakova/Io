import clsx from 'clsx';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { RiEmojiStickerLine as EmojiIcon } from 'react-icons/ri';
import EmojiPicker from '@emoji-mart/react';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';

export type MessageInputProps = {
  theme: 'light' | 'dark';
  name: string;
  type: string;
  value: string;
  className?: string;
  placeholder: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: (value: string) => void;
  setMessage: React.Dispatch<SetStateAction<string>>;
};

export function MessageInput(props: MessageInputProps) {
  const [openEmoji, setOpenEmoji] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const refEmojiPicker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const targetElement = e.target as Node;
      if (
        refEmojiPicker.current &&
        !refEmojiPicker.current.contains(targetElement)
      ) {
        setOpenEmoji(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-8/12 max-md:w-full">
      <button
        type="button"
        className="cursor-pointer absolute bottom-2 left-3 z-10"
        onClick={() => {
          setOpenEmoji(!openEmoji);
        }}
      >
        <EmojiIcon className="text-2xl text-foreground/50 hover:text-foreground/80 duration-300"></EmojiIcon>
      </button>
      <div ref={refEmojiPicker} className="w-[350px] noto-emoji-picker">
        {openEmoji && (
          <EmojiPicker
            theme={props.theme}
            set="google"
            ref={refEmojiPicker}
            className="top-0 message"
            onEmojiSelect={(emoji: { native: string }) => {
              props.setMessage(
                (message: string) => `${message}${emoji.native}`
              );
              inputRef.current?.focus();
            }}
          ></EmojiPicker>
        )}
      </div>
      <div className="flex overflow-hidden relative items-center">
        <input
          {...props}
          autoComplete="off"
          value={props.value}
          onChange={(e) => props.changeHandler(e)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              props.sendMessage(props.value);
            }
          }}
          className={clsx(
            `border border-foreground/20 outline-none max-md:w-full max-md:rounded-none focus:max-md:border-foreground/20
            focus:border-foreground/50 rounded-3xl h-10 pr-10 w-full pl-10 message`,
            props.className
          )}
        />
        <ButtonCircle
          actionType="message"
          handlerClick={() => {
            props.sendMessage(props.value);
          }}
          className="text-base max-md:ml-0 max-md:absolute max-md:right-0.5 text-foreground/50  max-md:min-w-[37px] max-md:min-h-[37px]
           bg-accent ml-5 max-md:border-0 max-md:h-[37px] max-md:w-[37px]"
        ></ButtonCircle>
      </div>
    </div>
  );
}

'use client';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { useEffect, useRef, useState } from 'react';
import { RiEmojiStickerLine as EmojiIcon } from 'react-icons/ri';
import { useGlobalContext } from '../common/globalContext';
import EmojiPicker from '@emoji-mart/react';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';

export function ChatInput({ sendMessage }) {
  const [message, setMessage] = useState('');
  const { theme } = useGlobalContext();
  const [openEmoji, setOpenEmoji] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const refEmojiPicker = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e) {
      const targetElement = e.target;
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
    <form
      action="#"
      onSubmit={(e) => e.preventDefault()}
      className="absolute px-2 py-4 flex justify-center w-full
       max-md:py-0 max-md:px-0
       bottom-15"
    >
      <div className="relative w-8/12 max-md:w-full">
        <button
          type="button"
          className="cursor-pointer absolute bottom-2 left-3"
          onClick={() => {
            setOpenEmoji(!openEmoji);
          }}
        >
          <EmojiIcon className="text-2xl text-foreground/50 hover:text-foreground/80 duration-300"></EmojiIcon>
        </button>
        <div ref={refEmojiPicker} className="w-[350px] noto-emoji-picker">
          {openEmoji && (
            <EmojiPicker
              theme={theme}
              set="google"
              onKeyDownHandler={(e) => console.log(e)}
              ref={refEmojiPicker}
              className="top-0 message"
              onEmojiSelect={(emoji: { native: string }) => {
                setMessage((message) => message + emoji.native);
                inputRef.current?.focus();
              }}
            ></EmojiPicker>
          )}
        </div>
        <div className="flex">
          <InputMain
            inputRef={inputRef}
            changeHandler={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            purpose="MESSAGE"
            placeholder="Сообщение..."
            name="chat"
            className="rounded-3xl h-10 pr-10 w-full pl-10 message "
            onKeyDownHandler={() => {
              null;
            }}
            sendMessage={() => {
              sendMessage(message);
              setOpenEmoji(false);
              setMessage('');
            }}
          ></InputMain>
          <LayoutButtonCircle
            type="MESSAGE"
            handlerClick={() => {
              sendMessage(message);
              setMessage('');
            }}
            className="text-base max-md:ml-0 max-md:absolute max-md:right-0 text-foreground/50 bg-accent ml-5 hover:text-foreground/80"
          ></LayoutButtonCircle>
        </div>
      </div>
    </form>
  );
}

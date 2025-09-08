'use client';
import { FaTelegramPlane as MessageIcon } from 'react-icons/fa';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { RiEmojiStickerLine as EmojiIcon } from 'react-icons/ri';
import { useGlobalContext } from '../common/globalContext';

export function ChatInput({ sendMessage }) {
  const [message, setMessage] = useState('');
  const { theme } = useGlobalContext();
  const [openEmoji, setOpenEmoji] = useState(false);
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
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          e.stopPropagation();
          e.preventDefault();
          setOpenEmoji(false);
        }
      }}
      disabled={EmojiPicker ? true : false}
    >
      <div className="relative w-8/12 max-md:w-full">
        <button
          type="button"
          className="cursor-pointer absolute bottom-2 left-3"
          onClick={() => setOpenEmoji(!openEmoji)}
        >
          <EmojiIcon className="text-2xl text-foreground/50 hover:text-foreground/80 duration-300"></EmojiIcon>
        </button>
        <div ref={refEmojiPicker} className="w-[350px]">
          <EmojiPicker
            theme={theme}
            open={openEmoji}
            emojiStyle="apple"
            onEmojiClick={(emoji) => {
              setMessage((prev) => prev + emoji.emoji);
            }}
            className="top-0"
          ></EmojiPicker>
        </div>

        <InputMain
          changeHandler={(e) => setMessage(e.target.value)}
          type="text"
          value={message}
          purpose="MESSAGE"
          placeholder="Сообщение..."
          name="chat"
          className=" rounded-3xl h-10 pr-10 w-full pl-10"
          onKeyDownHandler={() => {
            null;
          }}
          sendMessage={() => {
            sendMessage(message);
            setMessage('');
          }}
        ></InputMain>
        <MessageIcon className="absolute bottom-3 text-base text-foreground/50 right-3"></MessageIcon>
      </div>
    </form>
  );
}

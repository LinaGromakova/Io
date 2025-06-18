'use client';
import clsx from 'clsx';
import { UserMessage } from '../UserMessage/user-message';
import { JSX, useLayoutEffect, useRef } from 'react';

const messageArray = [
  {
    message: 'hello',
    atPush: '15:55',
    read: true,
    sender: 'ANOTHER',
  },
  {
    message: 'whats up?',
    atPush: '15:55',
    read: false,
    sender: 'ANOTHER',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
  {
    message: 'whats up?',
    atPush: '15:55',
    read: false,
    sender: 'ANOTHER',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
  {
    message: 'whats up?',
    atPush: '15:55',
    read: false,
    sender: 'ANOTHER',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
  {
    message: 'whats up?',
    atPush: '15:55',
    read: false,
    sender: 'ANOTHER',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
  {
    message: 'whats up?',
    atPush: '15:55',
    read: false,
    sender: 'ANOTHER',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
  {
    message: 'whats up?',
    atPush: '15:55',
    read: false,
    sender: 'ANOTHER',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
  {
    message: 'whats up?',
    atPush: '15:55',
    read: false,
    sender: 'ANOTHER',
  },
];

const scroll: string = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:interface
  hover:[&::-webkit-scrollbar-thumb]:interface
  [&::-webkit-scrollbar-thumb]:rounded-full`;
export function ChatBody(): JSX.Element {
  const chat = useRef(null);

  useLayoutEffect(() => {
    chat.current.scrollIntoView(false, { block: 'start' });
  }, []);

  return (
    <section
      className={clsx('py-5 px-12 w-full h-[85vh] overflow-y-scroll relative pb-20', scroll)}
    >
      <div>
        {messageArray.map((el, index) => {
          const { message, atPush, read, sender } = el;
          return (
            <UserMessage
              key={index}
              message={message}
              atPush={atPush}
              read={read}
              sender={sender}
            ></UserMessage>
          );
        })}
      </div>

      <div ref={chat} className='pb-20 absolute'></div>
    </section>
  );
}

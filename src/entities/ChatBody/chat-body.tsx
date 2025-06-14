'use client';
import clsx from 'clsx';
import { UserMessage } from '../UserMessage/user-message';
import { JSX } from 'react';
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
    read: true,
    sender: 'ANOTHER',
  },
  {
    message: 'hi',
    atPush: '2:55',
    read: true,
    sender: 'YOU',
  },
  {
    message: 'im fine',
    atPush: '17:55',
    read: true,
    sender: 'ANOTHER',
  },
];

const scroll: string = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-slate-800
  hover:[&::-webkit-scrollbar-thumb]:bg-slate-400
  [&::-webkit-scrollbar-thumb]:rounded-full`;
export function ChatBody(): JSX.Element {
  return (
    <section
      className={clsx('py-5 px-12 w-full h-[85vh] overflow-y-scroll relative pb-15', scroll)}
    >
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
    </section>
  );
}

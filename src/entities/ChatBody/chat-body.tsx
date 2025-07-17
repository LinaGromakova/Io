'use client';
import clsx from 'clsx';
import { UserMessage } from '../UserMessage/user-message';
import { JSX, useLayoutEffect, useRef } from 'react';
interface Message {
  message: string;
  atPush: string;
  read: boolean;
  sender: 'ANOTHER' | 'YOU';
}
const messageArray: Message[] = [
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
  {
    message:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem cum distinctio neque ab vitae iure deleniti incidunt consequuntur aperiam amet iusto, asperiores sunt magni facilis in! Ratione voluptatibus fuga aliquid?',
    atPush: '2:55',
    read: false,
    sender: 'YOU',
  },
];

const scroll: string = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:transparent
  hover:[&::-webkit-scrollbar-thumb]:transparent
  [&::-webkit-scrollbar-thumb]:rounded-full`;
export function ChatBody(): JSX.Element {
  const chat = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (chat) {
      chat.current?.scrollIntoView(false);
    }
  }, []);

  return (
    <section
      className={clsx(
        'py-5 px-12 max-md:px-6 w-full h-[85vh] overflow-y-scroll relative pb-20',
        scroll
      )}
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
      <div ref={chat} className="pb-20 absolute"></div>
    </section>
  );
}

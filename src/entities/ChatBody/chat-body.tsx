'use client';
import clsx from 'clsx';
import { UserMessage } from '../UserMessage/user-message';
import { useLayoutEffect, useRef } from 'react';
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

export function ChatBody() {
  const chat = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (chat) {
      chat.current?.scrollIntoView(false);
    }
    if (chat && chat.current) {
      chat.current.scrollTo({ top: chat.current.scrollHeight });
    }
  }, [messageArray]);

  return (
    <section
      className={clsx(
        'py-5 px-12  max-md:px-6 w-full h-[calc(100vh-80px)] overflow-y-auto',
        scroll
      )}
    >
      <div ref={chat} className="pb-5">
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
    </section>
  );
}

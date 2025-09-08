'use client';
import clsx from 'clsx';
import { UserMessage } from '../UserMessage/user-message';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import { ChatInput } from '@/features/ChatInput/ChatInput';
import { useGlobalContext } from '@/features/common/globalContext';

// interface Message {
//   message: string;
//   atPush: string;
//   read: boolean;
//   sender: 'ANOTHER' | 'YOU';
// }
const socket = io('http://localhost:5000');
const scroll: string = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:transparent
  hover:[&::-webkit-scrollbar-thumb]:transparent
  [&::-webkit-scrollbar-thumb]:rounded-full`;

async function getMessages(id: string | string[] | undefined) {
  try {
    const data = await fetch(`http://localhost:5000/chat/${id}`);
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error, 'oops! error!');
  }
}
export function ChatBody() {
  const router = useRouter();
  const { user } = useGlobalContext();
  const chat_id = router.query.id;
  const chat = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState({});

  function sendMessages(message, setMessage) {
    if (!message.trim()) {
      return;
    }
    setNewMessages({
      chat_id: chat_id,
      sender_id: user.id,
      content: message,
    });
  }

  useLayoutEffect(() => {
    if (chat) {
      chat.current?.scrollIntoView(false);
    }
    if (chat && chat.current) {
      chat.current.scrollTo({ top: chat.current.scrollHeight + 100 });
    }
  }, [messages]);
  useEffect(() => {
    if (!chat_id) return;
    socket.emit('join_chat', { chat_id: chat_id, user_id: user.id });

    return () => {
      socket.emit('leave_chat', { chat_id: chat_id, user_id: user.id });
    };
  }, [chat_id]);

  useEffect(() => {
    getMessages(chat_id).then((messages) => {
      setMessages(messages);
    });
  }, [chat_id]);
  useEffect(() => {
    socket.emit('send_message', newMessages);
    socket.on('new_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('new_message');
    };
  }, [newMessages]);

  return (
    <>
      <section
        className={clsx(
          'py-5 px-12  max-md:px-6 w-full h-[calc(100vh-80px)] overflow-y-auto',
          scroll
        )}
      >
        <div ref={chat} className="pb-5">
          {messages.map((message) => {
            return (
              <UserMessage
                key={message.id}
                sender_id={message.sender_id}
                content={message.content}
                is_read={message.is_read}
                created_at={message.created_at}
              ></UserMessage>
            );
          })}
        </div>
      </section>
      <ChatInput sendMessage={sendMessages}></ChatInput>
    </>
  );
}

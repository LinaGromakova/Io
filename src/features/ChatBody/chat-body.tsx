import clsx from 'clsx';
import { MessageItem } from '../../entities/message';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ChatInput } from '@/features/ChatInput/ChatInput';
import { socket, useGlobalContext } from '@/features/common/globalContext';
import Stellar from '../../../public/chat-bg/Stellar.svg';
import Empty from '../../../public/chat-icons/Empty.svg';

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
async function checkBlackList(user1_id: string, user2_id: string) {
  try {
    console.log(user1_id, user2_id);
    const data = await fetch(
      `http://localhost:5000/check_blacklist/${user1_id}/${user2_id}`
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
interface MessageInterface {
  id: string;
  chat_id: string;
  readonly sender_id: string;
  content: string;
  is_read: boolean;
  created_at: Date;
  sender_name: string;
  sender_image: string;
}
interface InterfaceCheckBlacklist {
  user_id: string;
  blocked_user_id: string;
  created_at: string;
}
export function ChatBody() {
  const router = useRouter();
  const { user, currentUser, setIsBlock } = useGlobalContext();
  const chat_id = router.query.id;
  const chat = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [newMessages, setNewMessages] = useState({});
  const [userInBlackList, setUserInBlackList] = useState<
    InterfaceCheckBlacklist | undefined
  >(undefined);
  function sendMessages(message: string) {
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
      chat.current.scrollTo({ top: chat.current.scrollHeight });
    }
  }, [messages]);

  useEffect(() => {
    setUserInBlackList(undefined);
    setIsBlock(false);
    checkBlackList(user.id, currentUser.id).then((check) => {
      if (check) {
        setUserInBlackList(check);
        if (check.user_id === user.id) {
          setIsBlock(true);
        }
      }
    });
  }, [chat_id, currentUser]);

  useEffect(() => {
    socket.on('add-blacklist', (data) => {
      if (data) {
        setUserInBlackList(data);
        if (data.user_id === user.id) {
          setIsBlock(true);
        }
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on('delete-blacklist', (result) => {
      console.log(result, 'this is result delete');
      setUserInBlackList(undefined);
      if (result.user_id === user.id) {
        setIsBlock(false);
      }
    });
  }, [socket]);

  useEffect(() => {
    if (!chat_id || !user.id) return;
    getMessages(chat_id).then((messages) => {
      setMessages(messages);
    });
    socket.emit('join_chat', { chat_id: chat_id, user_id: user.id });

    socket.emit('read_messages', chat_id, user.id);

    return () => {
      socket.emit('leave_chat', { chat_id: chat_id, user_id: user.id });
    };
  }, [chat_id]);

  useEffect(() => {
    socket.on('messages_read', (data) => {
      if (data.length !== 0) {
        const updatedIds = new Set(data.map((msg: { id: string }) => msg.id));
        setMessages((prev) =>
          prev.map((mgs) =>
            updatedIds.has(mgs.id) ? { ...mgs, is_read: true } : mgs
          )
        );
      }
    });
    return () => {
      socket.off('messages_read');
    };
  }, [socket]);

  useEffect(() => {
    socket.emit('send_message', newMessages);
    socket.on('new_message', (data) => {
      if (data.sender_id !== user.id) {
        socket.emit('read_messages', chat_id, user.id);
      }
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
          'pt-5 px-12 max-md:px-6 w-full h-[calc(100vh-80px)] overflow-y-auto ',
          scroll
        )}
      >
        <Stellar className="absolute pointer-events-none top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-[calc(100vh)/2.5] w-2/3 h-2/3" />
        {messages.length == 0 && (
          <Empty className="w-2/3 h-2/3 mx-auto relative my-auto translate-y-[10vh]" />
        )}

        <div>
          {messages.map((message: MessageInterface) => {
            return (
              <MessageItem
                currentUserId={user.id}
                key={message.id}
                senderId={message.sender_id}
                messageContent={message.content}
                isRead={message.is_read}
                createdAt={message.created_at}
              ></MessageItem>
            );
          })}
          <div ref={chat} className="h-15"></div>
        </div>
      </section>

      {(userInBlackList && (
        <div className="py-4 px-6 bg text-xl bg-extra absolute w-full text-center min-h-10 bottom-14 text-white">
          {userInBlackList.blocked_user_id === user.id
            ? 'Пользователь добавил Вас в чёрный список'
            : 'Вы добавили пользователя в чёрный список'}
        </div>
      )) || <ChatInput sendMessage={sendMessages}></ChatInput>}
    </>
  );
}

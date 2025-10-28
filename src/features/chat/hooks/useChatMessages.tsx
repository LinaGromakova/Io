
import { useEffect, useState } from 'react';
import { useChatContext } from '../context/chatContext';
import { MessageInterface } from '../types/MessageInterface';
import { socket } from '@/features/socket/context/socketContext';
export function useChatMessages(chatId: string, userId: string) {
  const { getMessages } = useChatContext();
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  useEffect(() => {
    if (!chatId || !userId) return;
    const loadMessages = async () => {
      try {
        const messages = await getMessages(chatId);
        setMessages(messages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };
    loadMessages();
    socket.emit('joinChat', { chatId, userId });
    socket.emit('readMessages', chatId, userId);

    return () => {
      socket.emit('leaveChat', { chatId, userId });
    };
  }, [chatId, userId]);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      if (data.senderId !== userId) {
        socket.emit('readMessages', chatId, userId);
      }
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off('newMessage');
    };
  }, []);

  useEffect(() => {
    socket.on('messagesRead', (data) => {
      if (data.length !== 0) {
        const updatedIds = new Set(data.map((msg: { id: string }) => msg.id));
        setMessages((prev) =>
          prev.map((mgs) =>
            updatedIds.has(mgs.messageId) ? { ...mgs, isRead: true } : mgs
          )
        );
      }
    });
    return () => {
      socket.off('messagesRead');
    };
  }, [socket]);

  return {
    messages,
    setMessages,
  };
}

import { useEffect, useState } from 'react';
import { MessageInterface } from '../types/MessageInterface';
import { useChatActions } from '../lib/useChatActions';
import { getSocket } from '@/features/socket/lib/useSocket';
export function useChatMessages(chatId: string, userId: string) {
  const socket = getSocket();

  const { getMessages } = useChatActions();

  const [messages, setMessages] = useState<MessageInterface[]>();

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
  }, [socket]);

  useEffect(() => {
    socket.on('messagesRead', (data) => {
      const updatedIds = new Set(
        data.map((msg: { messageId: string }) => msg.messageId)
      );
      setMessages((prev) => {
        if (prev) {
          return prev.map((mgs) => {
            return updatedIds.has(mgs.messageId)
              ? { ...mgs, isRead: true }
              : mgs;
          });
        }
      });
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

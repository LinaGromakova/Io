'use client';
import { useEffect, useState } from 'react';
import { MessageInterface } from '../../types';
import { useChatActions } from './use-chat-actions';
import { getSocket } from '@/shared/api/socket';

interface DataInterface {
  chatId: string;
  userId: string;
  messages: MessageInterface;
}
export function useChatMessages(chatId: string, userId: string) {
  const socket = getSocket();
  const { getMessages } = useChatActions();
  const [messages, setMessages] = useState<MessageInterface[] | undefined>(
    undefined
  );
  const [hasMarkedAsRead, setHasMarkedAsRead] = useState(false);

  useEffect(() => {
    if (!chatId || !userId) return;

    const loadMessages = async () => {
      try {
        const messages = await getMessages(chatId);
        setMessages(messages);
        const hasUnread = messages.some(
          (msg: MessageInterface) => !msg.isRead && msg.senderId !== userId
        );

        if (hasUnread && !hasMarkedAsRead) {
          socket.emit('readMessages', chatId, userId);
          setHasMarkedAsRead(true);
        }
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    loadMessages();
    socket.emit('joinChat', { chatId, userId });
    return () => {
      socket.emit('leaveChat', { chatId });
      setHasMarkedAsRead(false);
    };
  }, [chatId, userId]);

  useEffect(() => {
    const handleNewMessage = (data: MessageInterface) => {
      setMessages((prev) => (prev ? [...prev, data] : [data]));

      if (data.senderId !== userId) {
        socket.emit('readMessages', chatId, userId);
      }
    };

    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, chatId, userId]);

  useEffect(() => {
    const handleMessagesRead = (data: DataInterface) => {
      if (!data?.messages || !Array.isArray(data.messages)) return;
      const updatedIds = new Set(
        data.messages.map((msg: MessageInterface) => msg.messageId)
      );
      setMessages((prev) => {
        if (!prev) return prev;
        return prev.map((msg) =>
          updatedIds.has(msg.messageId) ? { ...msg, isRead: true } : msg
        );
      });
    };

    socket.on('messagesRead', handleMessagesRead);
    return () => {
      socket.off('messagesRead', handleMessagesRead);
    };
  }, [socket]);

  return { messages, setMessages };
}

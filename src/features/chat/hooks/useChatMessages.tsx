import { useSocketContext } from '@/features/socket/context/socketContext';
import { useEffect, useState } from 'react';
import { useChatContext } from '../context/chatContext';
import { MessageInterface } from '../types/MessageInterface';

export function useChatMessages(chatId: string, userId: string) {
  const { socket } = useSocketContext();
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
    socket.emit('join_chat', { chatId, userId });
    socket.emit('read_messages', chatId, userId);

    return () => {
      socket.emit('leave_chat', { chatId, userId });
    };
  }, [chatId]);

  useEffect(() => {
    socket.on('new_message', (data) => {
      if (data.sender_id !== userId) {
        socket.emit('read_messages', chatId, userId);
      }
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off('new_message');
    };
  }, []);

  useEffect(() => {
    socket.on('messages_read', (data) => {
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
      socket.off('messages_read');
    };
  }, [socket]);

  return {
    messages,
    setMessages,
  };
}

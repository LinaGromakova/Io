import { useSocketContext } from '@/features/socket/context/socketContext';
import { useEffect, useState } from 'react';

export function useSendMessage(chatId: string, userId: string) {
  const { socket } = useSocketContext();
  const [newMessage, setNewMessage] = useState({});
  function sendMessage(message: string) {
    if (!message.trim()) {
      return;
    }
    setNewMessage({
      chatId: chatId,
      senderId: userId,
      content: message,
    });
  }
  useEffect(() => {
    socket.emit('send_message', newMessage);
    return () => {
      socket.off('new_message');
    };
  }, [newMessage]);
  return {
    newMessage,
    setNewMessage,
    sendMessage,
  };
}

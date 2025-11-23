import { getSocket } from '@/features/socket/lib/useSocket';
import { useEffect, useState } from 'react';

export function useSendMessage(chatId: string, userId: string) {
  const socket = getSocket();
  const [newMessage, setNewMessage] = useState({});
  function sendMessage(message: string) {
    if (!message.trim()) {
      return;
    }
    console.log('yes!');
    setNewMessage({
      chatId: chatId,
      senderId: userId,
      content: message,
    });
  }
  useEffect(() => {
    console.log(newMessage);
    socket.emit('sendMessage', newMessage);
  }, [newMessage]);
  return {
    newMessage,
    setNewMessage,
    sendMessage,
  };
}

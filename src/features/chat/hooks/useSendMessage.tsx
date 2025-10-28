import { useEffect, useState } from 'react';
import { socket } from '@/features/socket/context/socketContext';
export function useSendMessage(chatId: string, userId: string) {
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
    console.log(newMessage);
    socket.emit('sendMessage', newMessage);
  }, [newMessage]);
  return {
    newMessage,
    setNewMessage,
    sendMessage,
  };
}

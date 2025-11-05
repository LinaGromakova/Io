import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { socketAtom } from '@/features/socket/lib/useSocket';

export function useSendMessage(chatId: string, userId: string) {
   const socket = useAtomValue(socketAtom);
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

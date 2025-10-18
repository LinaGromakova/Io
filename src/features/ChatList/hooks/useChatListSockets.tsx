import { useSocketContext } from '@/features/socket/context/socketContext';
import { useEffect } from 'react';
import { ChatInterface } from '../types/ChatInterface';
import { useChatListStore } from './useChatListStore';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function useChatListSockets() {
  const { socket } = useSocketContext();
  const { user } = useAuth();
  const { setChats } = useChatListStore(user.userId);
  useEffect(() => {
    socket.on('delete-chat', (chatId) => {
      setChats((prevChats: ChatInterface[]) =>
        prevChats.filter((chat: ChatInterface) => chat.chatId !== chatId)
      );
    });
  }, [socket]);

  useEffect(() => {
    socket.on('start-chat', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[]) => [...prevChats, data]);
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on('update-online', (data) => {
      setChats((prevChats: ChatInterface[]) =>
        prevChats.map((chat) =>
          chat.userId === data.userId ? { ...chat, online: data.online } : chat
        )
      );
    });

    return () => {
      socket.off('update-online');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('update-last-message', (data) => {
      setChats((prevChats: ChatInterface[]) =>
        prevChats.map((chat) =>
          chat.chatId === data.chat_id
            ? {
                ...chat,
                lastMessage: data.content,
                lastCreate: data.created_at,
                read: data.isRead,
              }
            : chat
        )
      );
    });
    return () => {
      socket.off('update-last-message');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('update-read-message', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[]) =>
          prevChats.map((chat) => {
            return chat.chatId === data.chatId ? { ...chat, read: true } : chat;
          })
        );
      }
    });
    return () => {
      socket.off('update-read-message');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('update-name', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[]) =>
          prevChats.map((chat) => {
            return chat.userId === data.id
              ? { ...chat, name: data.name }
              : chat;
          })
        );
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on('update-image', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[]) =>
          prevChats.map((chat) => {
            return chat.userId === data.id
              ? { ...chat, image: data.image }
              : chat;
          })
        );
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on('unread_updated', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[]) =>
          prevChats.map((chat) => {
            return chat.chatId === data.chat_id
              ? { ...chat, unreadCount: 0 }
              : chat;
          })
        );
      }
    });
  }, [socket]);
  useEffect(() => {
    socket.on('inc-unread-message', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[]) =>
          prevChats.map((chat) => {
            return chat.chatId === data.chatId
              ? { ...chat, unreadCount: data.count }
              : chat;
          })
        );
      }
    });
  }, [socket]);
}

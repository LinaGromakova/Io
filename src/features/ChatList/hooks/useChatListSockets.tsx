'use client';
import { useEffect } from 'react';
import { ChatInterface } from '../types/ChatInterface';
import { useChatListStore } from './useChatListStore';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { socket } from '@/features/socket/context/socketContext';
export function useChatListSockets() {
  // const { user } = useAuth();
  const user = {
    userId: '5HEzeZ4dB0iA2wJ3NdmvS',
    userName: 'Lina=',
    userImage: '/uploads/avatars/avatar-1759159994251-893137663.jpg',
    onlineStatus: false,
    lastSeen: '2025-10-13T00:49:32.751Z',
    createdAt: '2025-08-27T19:03:13.408Z',
  };
  const { setChats } = useChatListStore(user?.userId || '');
  useEffect(() => {
    socket.on('deleteChat', (chatId) => {
      setChats((prevChats: ChatInterface[]) =>
        prevChats.filter((chat: ChatInterface) => chat.chatId !== chatId)
      );
    });
  }, [socket]);
  useEffect(() => {
    socket.on('startChat', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[]) => [...prevChats, data]);
      }
    });
  }, [socket]);
  useEffect(() => {
    socket.on('updateOnline', (data) => {
      setChats((prevChats: ChatInterface[]) =>
        prevChats.map((chat) =>
          chat.userId === data.userId ? { ...chat, online: data.online } : chat
        )
      );
    });
    return () => {
      socket.off('updateOnline');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('updateLastMessage', (data) => {
      setChats((prevChats: ChatInterface[]) =>
        prevChats.map((chat) =>
          chat.chatId === data.chat_id
            ? {
                ...chat,
                lastMessage: data.content,
                lastCreate: data.created_at,
                isRead: data.isRead,
              }
            : chat
        )
      );
    });
    return () => {
      socket.off('updateLastMessage');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('updateReadMessage', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[]) =>
          prevChats.map((chat) => {
            return chat.chatId === data.chatId ? { ...chat, read: true } : chat;
          })
        );
      }
    });
    return () => {
      socket.off('updateReadMessage');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('updateName', (data) => {
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
    socket.on('updateImage', (data) => {
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
    socket.on('unreadUpdated', (data) => {
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
    socket.on('incUnreadMessage', (data) => {
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

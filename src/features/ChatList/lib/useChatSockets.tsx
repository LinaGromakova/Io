'use client';
import { useEffect } from 'react';
import { ChatInterface } from '../types/ChatInterface';
import { useAtomValue } from 'jotai';
import { socketAtom } from '@/features/socket/lib/useSocket';
import { useSetAtom } from 'jotai';
import { setChatsAtom } from '../model/chatAtoms';

export function useChatListSockets() {
  const socket = useAtomValue(socketAtom);

  const setChats = useSetAtom(setChatsAtom);
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

'use client';
import { useEffect } from 'react';
import { ChatInterface } from '@/shared/types/domain';
import { useSetAtom } from 'jotai';
import { chatsAtom } from '../../model/chat-atoms';
import { useRouter } from 'next/navigation';
import { useChatStore } from './use-chat-store';
import { getSocket } from '@/shared/api/socket';
import { useAuthState } from '@/features/auth/lib/hooks';

export function useChatListSockets() {
  const { user } = useAuthState();
  const socket = getSocket();
  const setChats = useSetAtom(chatsAtom);
  const { chats } = useChatStore();
  const router = useRouter();

  useEffect(() => {
    socket.on('deleteChat', (chatId) => {
      setChats((prevChats: ChatInterface[] | undefined) =>
        prevChats?.filter((chat: ChatInterface) => chat.chatId !== chatId)
      );
    });
    return () => {
      socket.off('deleteChat');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('startChat', (data) => {
      const isChatExists = chats?.some((chat) => chat.chatId === data.chatId);

      if (isChatExists && data.userId === user?.userId) {
        router.push(`/chat/${data.chatId}`);
        return;
      }
      router.push(`/chat/${data.chatId}`);
      setChats((prevChats: ChatInterface[] | undefined) => [
        ...(prevChats || []),
        data,
      ]);
    });

    return () => {
      socket.off('startChat');
    };
  }, [socket, chats]);
  useEffect(() => {
    socket.on('updateOnline', (data) => {
      setChats((prevChats: ChatInterface[] | undefined) =>
        prevChats?.map((chat) =>
          chat.userId === data.userId
            ? ({ ...chat, onlineStatus: data.onlineStatus } as ChatInterface)
            : chat
        )
      );
    });
    return () => {
      socket.off('updateOnline');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('updateLastMessage', (data) => {
      setChats((prevChats: ChatInterface[] | undefined) =>
        prevChats?.map((chat) =>
          chat.chatId === data.chatId
            ? {
                ...chat,
                lastMessage: data.content,
                lastMessageAt: data.createdAt,
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
      setChats((prevChats: ChatInterface[] | undefined) =>
        prevChats?.map((chat) => {
          return chat.chatId === data.chatId ? { ...chat, isRead: true } : chat;
        })
      );
    });
    return () => {
      socket.off('updateReadMessage');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('updateName', (data) => {
      setChats((prevChats: ChatInterface[] | undefined) =>
        prevChats?.map((chat) => {
          return chat.userId === data.userId
            ? { ...chat, userName: data.userName }
            : chat;
        })
      );
    });
    return () => {
      socket.off('updateName');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('updateImage', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[] | undefined) =>
          prevChats?.map((chat) => {
            return chat.userId === data.userId
              ? { ...chat, userImage: data.userImage }
              : chat;
          })
        );
      }
    });
    return () => {
      socket.off('updateImage');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('unreadUpdated', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[] | undefined) =>
          prevChats?.map((chat) => {
            return chat.chatId === data.chatId
              ? { ...chat, unreadCount: 0 }
              : chat;
          })
        );
      }
    });
    return () => {
      socket.off('unreadUpdated');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('incUnreadMessage', (data) => {
      if (data) {
        setChats((prevChats: ChatInterface[] | undefined) =>
          prevChats?.map((chat) => {
            return chat.chatId === data.chatId
              ? { ...chat, unreadCount: data.count }
              : chat;
          })
        );
      }
    });
    return () => {
      socket.off('incUnreadMessage');
    };
  }, [socket]);
}

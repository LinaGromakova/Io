import { useEffect, useState } from 'react';
import { useChatContext } from '../context';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useSocketContext } from '@/features/socket/context/socketContext';

type CurrentUserInterface = {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
};

export function useInitCurrentUser(chatId: string) {
  const { socket } = useSocketContext();
  const { user } = useAuth();
  const { getCurrentUser } = useChatContext();
  const [currentUser, setCurrentUser] = useState<CurrentUserInterface>({
    userId: '',
    userName: '',
    userImage: '',
    onlineStatus: false,
  });

  useEffect(() => {
    if (!chatId || !user?.userId) return;

    const fetchUser = async () => {
      const userData = await getCurrentUser(chatId, user.userId);
      setCurrentUser(userData);
    };

    fetchUser();
  }, [chatId]);

  useEffect(() => {
    socket.on('update-online', (data) => {
      setCurrentUser((user) => {
        return data.userId === user.userId
          ? { ...user, onlineStatus: data.onlineStatus }
          : user;
      });
    });
    return () => {
      socket.off('update-online');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('update-image', (data) => {
      setCurrentUser((user) => {
        return data.userId === user.userId
          ? { ...user, userImage: data.userimage }
          : user;
      });
    });
    return () => {
      socket.off('update-image');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('update-name', (data) => {
      setCurrentUser((user) => {
        return data.userId === user.userId
          ? { ...user, userName: data.userName }
          : user;
      });
    });
    return () => {
      socket.off('update-name');
    };
  }, [socket]);
  
  return { currentUser };
}

import { useEffect, useState } from 'react';
import { useChatContext } from '../context';
import { useAuth } from '@/features/auth/hooks/useAuth';

import { socket } from '@/features/socket/context/socketContext';
type TargetUserInterface = {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
};

export function useInitTargetUser(chatId: string) {
  const user = {
    userId: '5HEzeZ4dB0iA2wJ3NdmvS',
    userName: 'Lina=',
    userImage: '/uploads/avatars/avatar-1759159994251-893137663.jpg',
    onlineStatus: false,
    lastSeen: '2025-10-13T00:49:32.751Z',
    createdAt: '2025-08-27T19:03:13.408Z',
  };
  // const { user } = useAuth();
  const { getTargetUser } = useChatContext();
  const [targetUser, setTargetUser] = useState<TargetUserInterface>({
    userId: '',
    userName: '',
    userImage: '',
    onlineStatus: false,
  });
  useEffect(() => {
    if (!chatId || !user?.userId) return;
    const fetchUser = async () => {
      const userData = await getTargetUser(chatId, user.userId);
      setTargetUser(userData);
    };
    fetchUser();
  }, [chatId, user]);
  useEffect(() => {
    socket.on('updateOnline', (data) => {
      setTargetUser((user) => {
        return data.userId === user.userId
          ? { ...user, onlineStatus: data.onlineStatus }
          : user;
      });
    });
    return () => {
      socket.off('updateOnline');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('updateImage', (data) => {
      setTargetUser((user) => {
        return data.userId === user.userId
          ? { ...user, userImage: data.userimage }
          : user;
      });
    });
    return () => {
      socket.off('updateImage');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('updateName', (data) => {
      setTargetUser((user) => {
        return data.userId === user.userId
          ? { ...user, userName: data.userName }
          : user;
      });
    });
    return () => {
      socket.off('updateName');
    };
  }, [socket]);
  return { targetUser };
}

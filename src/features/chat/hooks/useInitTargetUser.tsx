import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import { useChatActions } from '../lib/useChatActions';
import { socketAtom } from '@/features/socket/lib/useSocket';
type TargetUserInterface = {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
};

export function useInitTargetUser(chatId: string) {
  const socket = useAtomValue(socketAtom);
  const { user } = useAuthState();
  const { getTargetUser } = useChatActions();
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

'use client';
import { useFetch } from '@/shared/lib/hooks';
import { useEffect, useState } from 'react';
import { useChatActions } from '@/features/chat/lib/useChatActions';
import { getSocket } from '@/features/socket/lib/useSocket';
import { useBlackListState } from '@/features/interface-state/lib/hooks';

interface userInBlackList {
  isBlock: boolean;
  blockedUserId: string | null;
  userId: string | null;
}

export function useBlackList(
  currentUserId: string,
  targetUserId?: string,
  chatId?: string
) {
  const socket = getSocket();
  const { isBlackListOpen } = useBlackListState();
  const { checkBlackList } = useChatActions();
  const [blackListUsers, setBlackListUsers] = useState([]);
  const [userInBlackList, setUserInBlackList] = useState<userInBlackList>({
    isBlock: false,
    blockedUserId: null,
    userId: null,
  });
  const [blackListLength, setBlackListLength] = useState(0);
  const { getData } = useFetch();

  async function loadBlackList() {
    const blackList = await getData(
      `http://localhost:5000/api/blacklist/${currentUserId}`
    );
    setBlackListUsers(blackList);
    setBlackListLength(blackList.length);
  }
  useEffect(() => {
    if (isBlackListOpen) {
      loadBlackList();
    }
  }, [isBlackListOpen]);
  useEffect(() => {
    if (!targetUserId) return;
    checkBlackList(currentUserId, targetUserId).then((check) => {
      if (check?.userId) {
        setUserInBlackList({
          isBlock: true,
          blockedUserId: check.blockedUserId,
          userId: check.userId,
        });
      } else {
        setUserInBlackList({
          isBlock: false,
          blockedUserId: null,
          userId: null,
        });
        console.log('no, not block');
      }
    });
  }, [chatId, targetUserId]);

  useEffect(() => {
    socket.on('addBlacklist', (data) => {
      setUserInBlackList({
        isBlock: true,
        blockedUserId: data.blockedUserId,
        userId: data.userId,
      });

      if (isBlackListOpen && currentUserId) loadBlackList();
    });
  }, [socket]);

  useEffect(() => {
    socket.on('deleteBlacklist', (data) => {
      setUserInBlackList({
        isBlock: false,
        blockedUserId: null,
        userId: null,
      });

      if (isBlackListOpen && currentUserId) loadBlackList();
    });
  }, [socket]);
  return {
    userInBlackList,
    blackListUsers,
    blackListLength,
  };
}

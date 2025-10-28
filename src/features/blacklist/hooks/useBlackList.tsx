'use client';
import { useChatContext } from '@/features/common/contexts';
import { useFetch } from '@/shared/lib/hooks';
import { useEffect, useState } from 'react';
import { socket } from '@/features/socket/context/socketContext';
interface userInBlackList {
  block: boolean;
  targetUserId: string | null;
  currentuserId: string | null;
}

export function useBlackList(
  currentUserId: string,
  targetUserId?: string,
  chatId?: string
) {
 
  const { setIsBlock, checkBlackList } = useChatContext();
  const [blackListUsers, setBlackListUsers] = useState([]);
  const [userInBlackList, setUserInBlackList] = useState<userInBlackList>({
    block: false,
    targetUserId: null,
    currentuserId: null,
  });
  const [blackListLength, setBlackListLength] = useState(0);
  const { getData } = useFetch();

  useEffect(() => {
    async function loadBlackList() {
      const blackList = await getData(
        `http://localhost:5000/api/blacklist/${currentUserId}`
      );
      setBlackListUsers(blackList);
      setBlackListLength(blackList.length);
    }
    loadBlackList();
  }, []);

  useEffect(() => {
    if (!targetUserId) return;
    setUserInBlackList(() => ({
      block: false,
      targetUserId: null,
      currentuserId: null,
    }));
    setIsBlock(false);
    checkBlackList(currentUserId, targetUserId).then((check) => {
      if (check) {
        setUserInBlackList({
          block: true,
          targetUserId: check.targetUserId,
          currentuserId: check.currentUserId,
        });
        if (check.userId === currentUserId) {
          setIsBlock(true);
        }
      }
    });
  }, [chatId, targetUserId]);

  useEffect(() => {
    socket.on('addBlacklist', (data) => {
      if (data) {
        setUserInBlackList({
          block: true,
          targetUserId: data.targetUserId,
          currentuserId: data.currentUserId,
        });
        if (data.userId === currentUserId) {
          setIsBlock(true);
        }
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on('deleteBlacklist', (result) => {
      setUserInBlackList({
        block: false,
        targetUserId: null,
        currentuserId: null,
      });
      if (result.userId === currentUserId) {
        setIsBlock(false);
      }
    });
  }, [socket]);
  return {
    userInBlackList,
    blackListUsers,
    blackListLength,
  };
}

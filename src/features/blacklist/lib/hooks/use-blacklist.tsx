'use client';
import { useFetch } from '@/shared/lib/hooks';
import { useEffect, useState } from 'react';
import { useChatActions } from '@/features/chat/lib/hooks';
import { useBlackListState } from '@/shared/api/store/lib/hooks';
import { getSocket } from '@/shared/api/socket';
import { API_URL } from '@/shared/lib/config';

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
  const [isBlock, setIsBlock] = useState(false);
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
      `${API_URL}/api/blacklist/${currentUserId}`
    );
    setBlackListUsers(blackList);
    setBlackListLength(blackList.length);
  }
  useEffect(() => {
    if (isBlackListOpen) {
      loadBlackList();
    }
  }, [isBlackListOpen]);

  const processBlockChecks = (checks: userInBlackList[]) => {
    if (checks && checks.length > 0) {
      const ourBlock = checks.find(
        (check: userInBlackList) => check.userId === currentUserId
      );
      const theirBlock = checks.find(
        (check: userInBlackList) => check.blockedUserId === currentUserId
      );
      setIsBlock(!!ourBlock);

      setUserInBlackList({
        isBlock: !!ourBlock || !!theirBlock,
        blockedUserId: ourBlock
          ? ourBlock.blockedUserId
          : theirBlock
          ? theirBlock.blockedUserId
          : null,
        userId: ourBlock
          ? ourBlock.userId
          : theirBlock
          ? theirBlock.userId
          : null,
      });
    } else {
      setIsBlock(false);
      setUserInBlackList({
        isBlock: false,
        blockedUserId: null,
        userId: null,
      });
    }
  };

  useEffect(() => {
    if (!targetUserId || !chatId || !currentUserId) return;
    checkBlackList(currentUserId, targetUserId).then(processBlockChecks);
  }, [chatId, targetUserId, currentUserId]);

  useEffect(() => {
    socket.on('addBlacklist', (data) => {
      if (!targetUserId) return;
      const currentBlocked = data.userId === currentUserId;
      setIsBlock(currentBlocked);
      setUserInBlackList({
        isBlock: true,
        blockedUserId: data.blockedUserId,
        userId: data.userId,
      });
      checkBlackList(currentUserId, targetUserId).then(processBlockChecks);
      loadBlackList();
    });
  }, [socket, currentUserId, targetUserId]);

  useEffect(() => {
    socket.on('deleteBlacklist', (data) => {
      if (!targetUserId) return;
      const currentBlocked = data.userId === currentUserId;
      if (currentBlocked) {
        setIsBlock(false);
      }
      checkBlackList(currentUserId, targetUserId).then(processBlockChecks);
      loadBlackList();
    });
  }, [socket, targetUserId, currentUserId]);

  return {
    userInBlackList,
    blackListUsers,
    blackListLength,
    isBlock,
  };
}

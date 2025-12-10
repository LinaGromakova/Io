'use client';

class RequestGuard {
  private static instance: RequestGuard;
  private pendingRequests: Map<string, Promise<any>> = new Map();
  static getInstance(): RequestGuard {
    if (!RequestGuard.instance) {
      RequestGuard.instance = new RequestGuard();
    }
    return RequestGuard.instance;
  }
  async execute<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const existing = this.pendingRequests.get(key);
    if (existing) {
      return existing;
    }
    const promise = fn()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        this.pendingRequests.delete(key);
      });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}
export const useChatActions = () => {
  const guard = RequestGuard.getInstance();

  const getTargetUser = async (chatId: string, userId: string) => {
    const key = `targetUser-${chatId}-${userId}`;
    return guard.execute(key, async () => {
      const response = await fetch(
        `http://localhost:5000/api/chats/${chatId}/${userId}`
      );
      return response.json();
    });
  };
  const getMessages = async (chatId: string) => {
    const key = `messages-${chatId}`;
    return guard.execute(key, async () => {
      const response = await fetch(`http://localhost:5000/chat/${chatId}`);
      return response.json();
    });
  };

  const checkBlackList = async (
    currentUserId: string,
    targetUserId: string
  ) => {
    const key = `blacklist-${currentUserId}-${targetUserId}`;
    return guard.execute(key, async () => {
      const response = await fetch(
        `http://localhost:5000/api/blacklist/check/${currentUserId}/${targetUserId}`
      );
      return response.json();
    });
  };

  return {
    getTargetUser,
    getMessages,
    checkBlackList,
  };
};

import { fetchJson } from '@/shared/api/client';

export const blockUser = (userId: string, targetUserId: string) => {
  return fetchJson('http://localhost:5000/api/blacklist/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentUserId: userId,
      targetUserId: targetUserId,
    }),
  });
};

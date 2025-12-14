import { fetchJson } from '@/shared/api/client';
import { API_URL } from '@/shared/lib/config';

export const blockUser = (userId: string, targetUserId: string) => {
  return fetchJson(`${API_URL}/api/blacklist/add`, {
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

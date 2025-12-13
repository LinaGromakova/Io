import { fetchJson } from '@/shared/api/client';

export const unblockUser = (userId: string, targetUserId: string) => {
  return fetchJson(
    `http://localhost:5000/api/blacklist/delete/${userId}/${targetUserId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

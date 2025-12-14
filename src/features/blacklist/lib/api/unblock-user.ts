import { fetchJson } from '@/shared/api/client';
import { API_URL } from '@/shared/lib/config';

export const unblockUser = (userId: string, targetUserId: string) => {
  return fetchJson(
    `${API_URL}/api/blacklist/delete/${userId}/${targetUserId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

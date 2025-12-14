import { API_URL } from '@/shared/lib/config';
import { fetchJson } from '../client';

export const startChat = (currentUserId: string, targetUserId: string) => {
  return fetchJson(`${API_URL}/api/chats/start-chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      сhatMemberId1: currentUserId,
      сhatMemberId2: targetUserId,
    }),
  });
};

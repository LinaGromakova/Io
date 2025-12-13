import { fetchJson } from '../client';

export const startChat = (currentUserId: string, targetUserId: string) => {
  return fetchJson('http://localhost:5000/api/chats/start-chat', {
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

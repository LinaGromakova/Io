import { fetchJson } from "../client";

export const deleteChat = (chatId: string) => {
  return fetchJson(`http://localhost:5000/api/chat/delete/${chatId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

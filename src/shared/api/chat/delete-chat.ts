import { API_URL } from "@/shared/lib/config";
import { fetchJson } from "../client";

export const deleteChat = (chatId: string) => {
  return fetchJson(`${API_URL}/api/chat/delete/${chatId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

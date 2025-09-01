export interface UserContactProps {
  chat_id: string;
  user_id: string | string[] | undefined;
  image?: string;
  name: string;
  online: boolean;
  lastMessage?: string;
  lastAtCreate?: string;
  read?: boolean;
  countMessage?: number;
  handlerOnContextMenu?: () => void;
  type: 'USER_CONTACT' | 'CURRENT_CONTACT';
  newCompanion: User;
}
interface User {
  id: string;
  image?: string;
  name: string;
  online: boolean;
}

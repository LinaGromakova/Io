export interface UserContactProps {
  user_id: string;
  chat_id: string;
  id: string | string[] | undefined;
  image: string;
  name: string;
  online: boolean;
  read: boolean;
  lastMessage?: string;
  lastCreate: Date;
  unreadCount: number;
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

export interface UserContactProps {
  id?: number;
  image?: string;
  name?: string;
  online?: boolean;
  lastMessage?: string;
  lastAtCreate?: string;
  read?: boolean;
  countMessage?: number;
  handlerOnContextMenu: any;
  type: 'USER_CONTACT' | 'CURRENT_CONTACT';
}

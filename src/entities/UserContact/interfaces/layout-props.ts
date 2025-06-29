export interface UserContactProps {
  image?: string;
  name: string;
  online: boolean;
  lastMessage: string;
  lastAtCreate: string;
  read: boolean;
  countMessage: number;
  type: 'USER_CONTACT' | 'CURRENT_CONTACT';
}

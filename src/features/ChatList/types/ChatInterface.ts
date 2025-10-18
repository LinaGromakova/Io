export interface ChatInterface {
  chatId: string;
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastMessage: string;
  lastCreate: string;
  unreadCount: number;
  isRead: boolean;
}

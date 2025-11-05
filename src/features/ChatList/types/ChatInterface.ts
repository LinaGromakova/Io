export interface ChatInterface {
  chatId: string;
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastMessageAt: string;
  lastCreate: string;
  unreadCount: number;
  isRead: boolean;
}

export interface ChatInterface {
  chatId: string;
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isRead: boolean;
}

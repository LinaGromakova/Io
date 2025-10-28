export interface MessageInterface {
  messageId: string;
  chatId: string;
  readonly senderId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

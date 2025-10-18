export interface MessageInterface {
  messageId: string;
  chatId: string;
  readonly senderId: string;
  messageContent: string;
  isRead: boolean;
  createdAt: Date;
}

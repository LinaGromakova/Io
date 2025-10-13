import { MessageTime } from './MessageTime';
import { MessageStatus } from './MessageStatus';
import { useMessageStyles } from '../hooks/useMessageStyles';

interface MessageProps {
  senderId: string;
  currentUserId: string;
  messageContent: string;
  createdAt: Date;
  isRead: boolean;
}

export function MessageItem({
  senderId,
  currentUserId,
  messageContent,
  createdAt,
  isRead,
}: MessageProps) {
  const { styles } = useMessageStyles(senderId, currentUserId);
  return (
    <div className="flex flex-col ">
      <article className={styles}>
        <p className="text-lg message pb-0.5">{messageContent}</p>
        <div className="absolute bottom-0.5 right-0.5 flex">
          <MessageTime createdAt={createdAt}></MessageTime>
          <MessageStatus isRead={isRead}></MessageStatus>
        </div>
      </article>
    </div>
  );
}

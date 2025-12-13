import { MessageTime } from './MessageTime';
import { MessageStatus } from './MessageStatus';
import { useMessageStyles } from '../lib/hooks/use-message-styles';

interface MessageProps {
  senderId: string;
  currentUserId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

export function MessageItem({
  senderId,
  currentUserId,
  content,
  createdAt,
  isRead,
}: MessageProps) {
  const { styles } = useMessageStyles(senderId, currentUserId);

  return (
    <div className="flex flex-col ">
      <article className={styles}>
        <p className="text-lg message pb-0.5">{content}</p>
        <div className="absolute bottom-0.5 right-0.5 flex">
          <MessageTime createdAt={createdAt}></MessageTime>
          <MessageStatus isRead={isRead}></MessageStatus>
        </div>
      </article>
    </div>
  );
}

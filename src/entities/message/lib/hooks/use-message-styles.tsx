import { clsx } from 'clsx';

export function useMessageStyles(senderId: string, currentUserId: string) {
  const styles = clsx(
    `max-w-96 min-w-18 inline rounded-xl p-4 relative mb-3 break-all border-foreground/40 text-white`,
    senderId === currentUserId
      ? `ml-auto bg-gradient-to-l from-accent-shadow/70 to-accent`
      : `mr-auto bg-gradient-to-r from-accent-shadow/70 to-accent`
  );
  return { styles };
}

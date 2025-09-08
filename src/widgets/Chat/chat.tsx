import { ChatBody } from '@/entities/ChatBody/chat-body';
import { ChatInput } from '@/features/ChatInput/ChatInput';
import { useGlobalContext } from '@/features/common/globalContext';
import clsx from 'clsx';

export function Chat() {
  const { theme } = useGlobalContext();


  return (
    <section
      className={clsx(
        'relative min-h-screen ',
        theme === 'dark' ? 'bg-[#1b1a1a]' : 'bg-[#e6e6e6]'
      )}
    >
      <ChatBody></ChatBody>

    </section>
  );
}

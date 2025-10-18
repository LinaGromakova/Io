'use client';
import { useState } from 'react';
import { InputMain } from '@/shared/ui/InputMain';
import { useThemeContext } from '@/features/common/contexts';

interface ChatInputProps {
  sendMessage: (message: string) => void;
}
export function ChatInput({ sendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const { theme } = useThemeContext();

  return (
    <form
      action="#"
      onSubmit={(e) => e.preventDefault()}
      className="absolute px-2 py-4 flex justify-center w-full max-md:py-0 max-md:px-0 bottom-15"
    >
      <InputMain
        changeHandler={(e) => setMessage(e.target.value)}
        setMessage={setMessage}
        theme={theme}
        type="text"
        value={message}
        purpose="message"
        placeholder="Сообщение..."
        name="chat"
        sendMessage={() => {
          sendMessage(message);
          setMessage('');
        }}
      ></InputMain>
    </form>
  );
}

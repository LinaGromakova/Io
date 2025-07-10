import { ChatBody } from '@/entities/ChatBody/chat-body';
import { ChatInput } from '@/features/ChatInput/ChatInput';
import Image from 'next/image';
import { JSX } from 'react';

export function Chat(): JSX.Element {
  return (
    <section className="relative">
      <Image
        src="/wallpaper-chat/wallpaper-chat.jpg"
        className="absolute w-full h-full object-cover max-w-full"
        width={1700}
        height={1000}
        quality={100}
        alt=""
      ></Image>
      <ChatBody></ChatBody>
      <ChatInput></ChatInput>
    </section>
  );
}

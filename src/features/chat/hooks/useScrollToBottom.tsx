import { useLayoutEffect, useRef } from 'react';
import { MessageInterface } from '../types/MessageInterface';

export function useScrollToBottom(dep: MessageInterface[]) {
  const chatRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (chatRef) {
      chatRef.current?.scrollIntoView(false);
    }
    if (chatRef && chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight });
    }
  }, [dep]);

  return { chatRef };
}

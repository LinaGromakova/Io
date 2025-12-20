import { useEffect, useRef } from 'react';
import { MessageInterface } from '../../types';

export function useScrollToBottom(dep: MessageInterface[] | undefined) {
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRef) {
      chatRef.current?.scrollIntoView(false);
    }
    if (chatRef && chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight });
    }
  }, [dep]);

  return { chatRef };
}

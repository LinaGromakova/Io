import { useLayoutEffect, useRef } from 'react';
import { MessageInterface } from '../../types';

export function useScrollToBottom(dep: MessageInterface[] | undefined) {
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

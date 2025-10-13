import { useRouter } from 'next/router';
import React, { useRef } from 'react';

export function useUserContact(
  onBubbleMenuOpen: (
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => void,
  isBubbleMenuOpen: boolean,
  setIsBubbleMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onSidebarClose?: (arg0: boolean) => void,
  chatId?: string
) {
  const { query } = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const isActive = query.id == chatId;

  const handleTouchStart = () => {
    timeoutRef.current = setTimeout(() => {
      onBubbleMenuOpen(isBubbleMenuOpen, setIsBubbleMenuOpen);
    }, 600);
  };

  const handleTouchEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.button === 2) {
      onBubbleMenuOpen(isBubbleMenuOpen, setIsBubbleMenuOpen);
    }
  };
  const handleClick = () => {
    onSidebarClose?.(false);
  };

  return {
    isActive,
    handleTouchStart,
    handleTouchEnd,
    handleContextMenu,
    handleClick,
  };
}

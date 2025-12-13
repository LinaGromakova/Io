'use client';
import { useParams } from 'next/navigation';
import React, { useRef } from 'react';

export function useUserContact(
  onBubbleMenuOpen: () => void,
  onSidebarClose?: () => void,
  chatId?: string
) {
  const params = useParams();
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const isActive = params?.id === chatId;
  const handleTouchStart = () => {
    timeoutRef.current = setTimeout(() => {
      onBubbleMenuOpen();
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
      onBubbleMenuOpen();
    }
  };
  const handleClick = () => {
    onSidebarClose?.();
  };

  return {
    isActive,
    handleTouchStart,
    handleTouchEnd,
    handleContextMenu,
    handleClick,
  };
}

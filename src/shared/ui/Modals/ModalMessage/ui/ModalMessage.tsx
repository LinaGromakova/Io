'use client';
import { Portal } from '@/shared/ui/portal';
import { useEffect } from 'react';

interface ModalMessageProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalMessage({ message, isOpen, onClose }: ModalMessageProps) {
  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (isOpen) {
      timeout = setTimeout(() => {
        onClose();
      }, 1800);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen]);

  return (
    <Portal>
      {isOpen && (
        <article
          className="fixed top-5 left-1/2 modal-anim text-center text-lg
         -translate-x-1/2 bg-inter shadow-xl border-foreground/10 border z-[1000] py-5 px-4 max-md:px-2.5
          "
        >
          {message}
        </article>
      )}
    </Portal>
  );
}

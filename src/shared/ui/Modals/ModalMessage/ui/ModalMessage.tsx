'use client';
import { Portal } from '@/shared/ui/portal';
import { useEffect } from 'react';

interface StateModal {
  message: string;
  open: boolean;
}
interface ModalMessageProps {
  message: string;
  open: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (state: StateModal) => void;
}

export function ModalMessage({
  message,
  open,
  isModalOpen,
  setIsModalOpen,
}: ModalMessageProps) {
  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (isModalOpen) {
      timeout = setTimeout(() => {
        setIsModalOpen({ message: '', open: false });
      }, 2550);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isModalOpen]);

  return (
    <Portal>
      {open && (
        <article
          className="fixed top-5 left-1/2  modal-anim text-center
         -translate-x-1/2 bg-inter shadow-xl border-foreground/10 border z-[1000] py-5 px-4 max-md:px-2.5
          "
        >
          {message}
        </article>
      )}
    </Portal>
  );
}

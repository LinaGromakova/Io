import { useGlobalContext } from '@/features/common/globalContext';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function Portal({ children }: { children: React.ReactNode }) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentDiv = document.createElement('div');
    elRef.current = currentDiv;
    document.body.appendChild(currentDiv);
    return () => {
      document.body.removeChild(currentDiv);
    };
  }, []);

  return elRef.current ? createPortal(children, elRef.current) : null;
}
interface ModalMessageLayoutProps {
  message: string;
  open: boolean;
}
export function ModalMessageLayout(props: ModalMessageLayoutProps) {
  const { isModalMessageOpen, setIsModalMessageOpen } = useGlobalContext();
  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (isModalMessageOpen.open) {
      timeout = setTimeout(() => {
        setIsModalMessageOpen({ message: '', open: false });
      }, 2550);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isModalMessageOpen.open]);
  return (
    <Portal>
      {props.open && (
        <article
          className="fixed top-5 left-1/2  modal-anim text-center
         -translate-x-1/2 bg-inter shadow-xl border-foreground/10 border z-[1000] py-5 px-4 max-md:px-2.5
          "
        >
          {props.message}
        </article>
      )}
    </Portal>
  );
}

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

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ButtonMain } from '../Button-main/button-main-layout';
import { useGlobalContext } from '@/features/common/globalContext';

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
interface ConfirmModalLayoutProps {
  id: string;
  name: string;
}
export function ConfirmModalLayout(props: ConfirmModalLayoutProps) {
  const { isModalOpen, modalSettings } = useGlobalContext();

  return (
    <Portal>
      {isModalOpen.open && (
        <div className="w-full fixed z-[1000] h-screen bg-black/40 top-0 left-0 flex justify-center items-center ">
          <article className="bg-background px-8 py-4 max-sm:w-11/12 max-sm:px-2">
            <p className="pt-5 mb-3 text-base text-center">
              {modalSettings[isModalOpen.type].message(props.name)}
            </p>
            <div className="flex">
              <ButtonMain
                type="ok"
                className="w-50 mr-5"
                handlerClick={() =>
                  modalSettings[isModalOpen.type].handlerOk(props.id)
                }
              ></ButtonMain>
              <ButtonMain
                type="cancel"
                className="w-50"
                handlerClick={() =>
                  modalSettings[isModalOpen.type].handlerCancel()
                }
              ></ButtonMain>
            </div>
          </article>
        </div>
      )}
    </Portal>
  );
}

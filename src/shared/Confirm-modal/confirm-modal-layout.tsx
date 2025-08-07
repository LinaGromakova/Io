import { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ButtonMain } from '../Button-main/button-main-layout';
import { GlobalContext } from '@/widgets/Header/layouts/header-sidebar-layout';

export function Portal({ children }) {
  const elRef = useRef(null);

  useEffect(() => {
    let currentDiv = document.createElement('div');
    elRef.current = currentDiv;
    document.body.appendChild(currentDiv);
    return () => {
      document.body.removeChild(currentDiv);
    };
  }, []);

  return elRef.current ? createPortal(children, elRef.current) : null;
}

export function ConfirmModalLayout({ message, handlerCancel, handlerOk }) {
  const { isModalOpen } = useContext(GlobalContext);
  return (
    <Portal>
      {isModalOpen.open && (
        <div className="w-full fixed z-[1000] h-screen bg-black/70 top-0 left-0 flex justify-center items-center">
          <article className="bg-background px-8 py-4 ">
            <p className="pt-5 mb-3 text-base">{message}</p>
            <div className="flex">
              <ButtonMain
                type="ok"
                className="w-50 mr-5"
                handlerClick={() => handlerOk()}
              ></ButtonMain>
              <ButtonMain
                type="cancel"
                className="w-50"
                handlerClick={() => handlerCancel()}
              ></ButtonMain>
            </div>
          </article>
        </div>
      )}
    </Portal>
  );
}

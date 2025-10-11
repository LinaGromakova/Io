import React from 'react';
import { Portal } from '../../../portal/Portal';
import { ButtonMain } from '../../../ButtonMain';

interface ModalConfig {
  message: (arg0: string) => string;
  handlerCancel: () => void;
  handlerOk: (chat_id: string) => void;
}
interface ConfirmModalProps {
  id: string;
  name: string;
  isOpen: boolean;
  confirmType: string;
  modalSettings: Record<string, ModalConfig>;
}
export function ConfirmModal({
  id,
  name,
  isOpen,
  confirmType,
  modalSettings,
}: ConfirmModalProps) {
  if (!modalSettings[confirmType]) return null;

  const { message, handlerOk, handlerCancel } = modalSettings[confirmType];
  return (
    <Portal>
      {isOpen && (
        <div className="w-full fixed z-[1000] h-screen bg-[#1011138c] top-0 left-0 flex justify-center items-center ">
          <article
            className="bg-inter px-4 py-4 max-sm:px-4 rounded-2xl shadow-xl flex flex-col items-center 
            min-w-sm max-sm:min-w-11/12 max-sm:max-w-11/12 w-auto max-w-md"
          >
            <p className="pt-7 text-lg text-center w-11/12 max-sm:w-full">
              {message(name)}
            </p>
            <div className="flex justify-center max-sm:justify-between w-full">
              <ButtonMain
                actionType="ok"
                text="ok"
                type="button"
                className="w-40 mr-4  max-sm:w-1/2"
                handlerClick={() => handlerOk(id)}
              ></ButtonMain>
              <ButtonMain
                actionType="cancel"
                text="cancel"
                type="button"
                className="w-40 max-sm:w-1/2"
                handlerClick={() => handlerCancel()}
              ></ButtonMain>
            </div>
          </article>
        </div>
      )}
    </Portal>
  );
}

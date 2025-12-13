import { useAtomValue, useSetAtom } from 'jotai';
import { closeModalMessageAtom, modalMessageAtom, openModalMessageAtom } from '../model/atoms/modal-message-atoms';

export const useModalMessage = () => ({
  state: useAtomValue(modalMessageAtom),
  open: useSetAtom(openModalMessageAtom),
  close: useSetAtom(closeModalMessageAtom),
});


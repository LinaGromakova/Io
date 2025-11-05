import { useAtomValue, useSetAtom } from 'jotai';
import {
  modalStateAtom,
  openModalAtom,
  closeModalAtom,
  toggleModalAtom,
} from '../model/atoms';

export const useModalState = () => ({
  isModalOpen: useAtomValue(modalStateAtom),
});

export const useModalControls = () => ({
  openModal: useSetAtom(openModalAtom),
  closeModal: useSetAtom(closeModalAtom),
  toggleModal: useSetAtom(toggleModalAtom),
});

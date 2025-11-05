import { atom } from 'jotai';
interface ModalData {
  isOpen: boolean;
  modalType: string;
  currentUserId: string;
  targetUserId: string;
  targetUserName: string;
  chatId: string;
}
export const modalStateAtom = atom<ModalData>({
  isOpen: false,
  modalType: '',
  currentUserId: '',
  targetUserId: '',
  targetUserName: '',
  chatId: '',
});

export const openModalAtom = atom(
  null,
  (get, set, params: Partial<ModalData>) => {
    set(modalStateAtom, { ...get(modalStateAtom), ...params, isOpen: true });
  }
);

export const closeModalAtom = atom(null, (get, set) => {
  set(modalStateAtom, { ...get(modalStateAtom), isOpen: false });
});

export const toggleModalAtom = atom(
  null,
  (get, set, params?: Partial<ModalData>) => {
    const current = get(modalStateAtom);
    set(modalStateAtom, {
      ...current,
      ...params,
      isOpen: !current.isOpen,
    });
  }
);

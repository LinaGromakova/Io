import { useAtomValue, useSetAtom } from 'jotai';
import { isAddUserOpenAtom, toggleAddUserAtom } from '../model/atoms/add-user-atom';

export const useAddUser = () => ({
  isAddUserOpen: useAtomValue(isAddUserOpenAtom),
  toggleAddUser: useSetAtom(toggleAddUserAtom),
});


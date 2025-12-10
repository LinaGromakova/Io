import { useSetAtom } from 'jotai';
import { useFetch } from '@/shared/lib/hooks';
import { useModalMessage } from '@/features/interface-state/lib/hooks';
import { loginAtom, logoutAtom } from '../model/actions';
import { FormInterface } from '../types/FormInterface';
import { redirect } from '@/shared/lib/redirect/redirect';

export const useAuthActions = () => {
  const { getData } = useFetch();
  const { open: openModal, state } = useModalMessage();
  const login = useSetAtom(loginAtom);
  const logout = useSetAtom(logoutAtom);
  const logOutUser = () => {
    getData('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    logout();
    redirect('/login');
  };

  const authUser = async (
    e: React.MouseEvent,
    actionType: 'login' | 'register',
    dataAuth: FormInterface | { [k: string]: string }
  ) => {
    e.preventDefault();
    try {
      const result = await getData(
        `http://localhost:5000/api/auth/${actionType}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(dataAuth),
        }
      );
      if (result.status) {
        if (!state.open) {
          openModal(result.message);
        }
      }
      if (result && result.user) {
        login(result.user);
        redirect('/');
      }
    } catch (error) {
      openModal(`Ошибка ${error}`);
    }
  };

  return {
    logOutUser,
    authUser,
  };
};

import { useSetAtom } from 'jotai';
import { useFetch } from '@/shared/lib/hooks';
import { useModalMessage } from '@/shared/api/store/lib/hooks';
import { loginAtom, logoutAtom } from '../../model/auth-actions';
import { FormInterface } from '../../model/types';
import { redirect } from '@/shared/lib/redirect/redirect';
import { API_URL } from '@/shared/lib/config';

export const useAuthActions = () => {
  const { getData } = useFetch();
  const { open: openModal, state } = useModalMessage();
  const login = useSetAtom(loginAtom);
  const logout = useSetAtom(logoutAtom);
  const logOutUser = () => {
    getData(`${API_URL}/api/auth/logout`, {
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
        `${API_URL}/api/auth/${actionType}`,
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

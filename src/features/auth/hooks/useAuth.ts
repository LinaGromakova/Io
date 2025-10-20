'use client';
import { useUiContext } from '@/features/common/contexts';
import { useFetch, useLocalStorage } from '@/shared/lib/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface UserInterface {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastSeen: string;
  createdAt: string;
}
interface interfaceForm {
  login: string;
  name: string;
  password: string;
  duplicate: string;
  [key: string]: string;
}

export function useAuth() {
  // const router = useRouter();
  const { getData } = useFetch();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<UserInterface>(null!);
  const { updateUser } = useLocalStorage();
  const { setIsModalMessageOpen } = useUiContext();
  const logOutUser = () => {
    return getData('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const checkSession = () => {
    return getData('http://localhost:5000/session-check', {
      credentials: 'include',
    });
  };

  const authUser = (
    e: React.MouseEvent,
    actionType: 'login' | 'register',
    dataAuth: interfaceForm | { [k: string]: string }
  ) => {
    e.preventDefault();
    try {
      const result = getData(`http://localhost:5000/${actionType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataAuth),
      });

      if (result) {
        setIsAuth(true);
        updateUser(result.user);
        setUser(result.user);
        // router.replace('/');
      }
    } catch (error) {
      return setIsModalMessageOpen({ message: `Ошибка ${error}`, open: true });
    }
  };

  return {
    logOutUser,
    checkSession,
    authUser,
    isAuth,
    setIsAuth,
    user,
    setUser,
  };
}

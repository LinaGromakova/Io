import { useLayoutEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useFetch, useLocalStorage } from '@/shared/lib/hooks';
import { useRouter } from 'next/router';
interface UserInterface {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastSeen: string;
  createdAt: string;
}
export function useAuthInit() {
  const router = useRouter();
  const { storage, removeUserData, updateUser } = useLocalStorage();
  const [isAuth, setIsAuth] = useState(false);
  const { checkSession } = useAuth();
  const { getData } = useFetch();
  const [user, setUser] = useState<UserInterface>(storage.user!);

  const getUser = (userId: string) => {
    return getData(`http://localhost:5000/user/${userId}`);
  };

  useLayoutEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const session = await checkSession();

        if (session === 401) {
          removeUserData();
          if (isMounted) {
            setIsAuth(false);
            router.replace('/login');
          }
          return;
        }
        const userData = await getData(
          `http://localhost:5000/user/${session.userId}`
        );

        if (isMounted) {
          if (!storage.user) {
            updateUser(userData);
          }
          setUser(userData);
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Auth init error:', error);
        if (isMounted) {
          setIsAuth(false);
          router.replace('/login');
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, isAuth, setUser, setIsAuth, getUser };
}

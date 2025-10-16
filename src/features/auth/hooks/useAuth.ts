import { useFetch } from '@/shared/lib/hooks';

export function useAuth() {
  const { getData } = useFetch();

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
  return { logOutUser, checkSession };
}

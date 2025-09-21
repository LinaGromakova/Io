'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
interface UserInterface {
  id: string;
  name: string;
  image: string;
  online: boolean;
  last_seen: string;
  created_at: string;
}
export function useLocalStorage() {
  const [storage, setStorage] = useState(() => {
    if (typeof window === 'undefined') {
      return { user: null };
    }
    return (
      JSON.parse(localStorage.getItem('userData')) || {
        user: null,
      }
    );
  });

  const [preferTheme, setPreferTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    return localStorage.getItem('preferTheme') || 'light';
  });

  useLayoutEffect(() => {
    localStorage.setItem('preferTheme', preferTheme);
  }, [preferTheme]);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(storage));
  }, [storage]);

  function updateUser(user: UserInterface) {
    localStorage.setItem('userData', JSON.stringify(storage));
    return setStorage({ user: user });
  }
  function removeUserData() {
    localStorage.removeItem('userData');
  }
  function updatePreferTheme(theme: 'light' | 'dark') {
    return setPreferTheme(theme);
  }

  return {
    storage,
    updatePreferTheme,
    updateUser,
    preferTheme,
    removeUserData,
  };
}

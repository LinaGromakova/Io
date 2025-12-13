'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { UserInterface } from '@/shared/types/domain';

interface StorageData {
  user: UserInterface | null;
  sessionId?: string;
  theme?: 'light' | 'dark';
}
export function useLocalStorage() {
  const [storage, setStorage] = useState<StorageData>(() => {
    if (typeof window === 'undefined') {
      return { user: null };
    }
    return (
      JSON.parse(localStorage.getItem('userData') || 'null') || {
        user: null,
      }
    );
  });

  const [preferTheme, setPreferTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    return (localStorage.getItem('preferTheme') as 'light' | 'dark') || 'light';
  });

  useLayoutEffect(() => {
    localStorage.setItem('preferTheme', preferTheme);
  }, [preferTheme]);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(storage));
  }, [storage]);

  function updateUser(user: UserInterface): void {
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

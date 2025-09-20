'use client';
import { useEffect, useLayoutEffect, useState } from 'react';

export function useLocalStorage() {
  const [storage, setStorage] = useState(() => {
    if (typeof window === 'undefined') {
      return { user: null, sessionId: '' };
    }
    const saved = localStorage.getItem('userData');
    return saved
      ? JSON.parse(saved)
      : {
          user: null,
          sessionId: '',
        };
  });
  const [preferTheme, setPreferTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    return localStorage.getItem('preferTheme') || 'light';
  });

  useLayoutEffect(() => {
    localStorage.setItem('preferTheme', preferTheme);
    console.log(preferTheme);
  }, [preferTheme]);
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(storage));
  }, [storage]);
  function updateUser(user) {
    return setStorage((prev) => {
      return { ...prev, user: user };
    });
  }
  function updatePreferTheme(theme: 'light' | 'dark') {
    return setPreferTheme(theme);
  }
  function updateSessionId(sessionId: string) {
    return setStorage((prev) => {
      return { ...prev, sessionId: sessionId };
    });
  }
  return {
    storage,
    updatePreferTheme,
    updateSessionId,
    updateUser,
    preferTheme,
  };
}

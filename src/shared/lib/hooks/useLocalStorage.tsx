'use client';
import { useEffect, useState } from 'react';
interface UserInterface {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastSeen: string;
  createdAt: string;
}
interface StorageData {
  user: UserInterface | null;
  sessionId?: string;
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

  return {
    storage,
    updateUser,
    removeUserData,
  };
}

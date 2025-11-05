'use client';
import { useAuthSetters, useAuthState } from '@/features/auth/lib/useAuthState';
import {
  useModalMessage,
  useSettings,
} from '@/features/interface-state/lib/hooks';
import { useEffect, useState } from 'react';

export function useEditProfile() {
  const { isSettingsOpen } = useSettings();
  const { open } = useModalMessage();
  const [nameInputValue, setNameInputValue] = useState('');
  const [newPhotoUser, setNewPhotoUser] = useState<File | null>(null);
  const { user } = useAuthState();
  const { setUser } = useAuthSetters();
  async function changeUserName() {
    try {
      const response = await fetch(
        'http://localhost:5000/api/users/profile/name',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.userId,
            newUserName: nameInputValue,
          }),
        }
      );
      const result = await response.json();
      setUser((prev) => ({ ...prev, name: result }));
      open('Новое имя сохранено!');
      setNameInputValue('');
    } catch (error) {
      console.log('Error:', error);
    }
  }
  async function handleFileSelect() {
    const file = newPhotoUser;
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('user_id', user.userId);

    try {
      const response = await fetch('http://localhost:5000/api/users/avatar', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setNewPhotoUser(null);
      setUser((prev) => ({ ...prev, userImage: result.avatarUrl }));
      open('Новое фото сохранено!');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    return () => {
      if (newPhotoUser) {
        URL.revokeObjectURL(URL.createObjectURL(newPhotoUser));
      }
    };
  }, [newPhotoUser]);
  useEffect(() => {
    if (!isSettingsOpen) {
      setNameInputValue('');
      setNewPhotoUser(null);
    }
  }, [isSettingsOpen]);

  return {
    changeUserName,
    handleFileSelect,
    nameInputValue,
    setNameInputValue,
    newPhotoUser,
    setNewPhotoUser,
  };
}

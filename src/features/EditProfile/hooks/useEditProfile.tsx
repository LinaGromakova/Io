import { useAuth } from '@/features/auth/hooks/useAuth';
import { useUiContext } from '@/features/common/contexts';
import { useEffect, useState } from 'react';

export function useEditProfile() {
  const { isUserSettingsOpen, setIsModalMessageOpen } = useUiContext();
  const [nameInputValue, setNameInputValue] = useState('');
  const [newPhotoUser, setNewPhotoUser] = useState<File | null>(
    null
  );
  const { user, setUser } = useAuth();

  async function changeUserName() {
    try {
      const response = await fetch('http://localhost:5000/profile/name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          newUserName: nameInputValue,
        }),
      });
      const result = await response.json();
      setUser((prev) => ({ ...prev, name: result }));
      setIsModalMessageOpen({ message: 'Новое имя сохранено!', open: true });
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
      const response = await fetch('http://localhost:5000/avatar', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setNewPhotoUser(null);
      setUser((prev) => ({ ...prev, userImage: result.avatarUrl }));
      setIsModalMessageOpen({ message: 'Новое фото сохранено!', open: true });
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
    if (!isUserSettingsOpen) {
      setNameInputValue('');
      setNewPhotoUser(null);
    }
  }, [isUserSettingsOpen]);

  return {
    changeUserName,
    handleFileSelect,
    nameInputValue,
    setNameInputValue,
    newPhotoUser,
    setNewPhotoUser,
  };
}

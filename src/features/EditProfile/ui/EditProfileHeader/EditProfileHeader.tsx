import { useModalContext, useUiContext } from '@/features/common/contexts';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import React from 'react';

interface EditProfileHeaderInterface {
  newPhoto: File | null | undefined;
  newName: string;
  setNameInputValue: React.Dispatch<React.SetStateAction<string>>;
  setNewPhotoUser: React.Dispatch<
    React.SetStateAction<File | null>
  >;
}
export function EditProfileHeader({
  newPhoto,
  newName,
  setNameInputValue,
  setNewPhotoUser,
}: EditProfileHeaderInterface) {
  const { changeModalView } = useModalContext();
  const { setIsUserSettingsOpen } = useUiContext();
  return (
    <header className="w-full px-4 flex items-center mt-2">
      <ButtonCircle
        actionType="back"
        className="min-w-9"
        handlerClick={() => {
          if (newPhoto || newName) {
            changeModalView({
              modalType: 'exitNotSave',
              currentUserId: '',
              targetUserId: '',
              targetUserName: '',
              chatId: '',
            });
          } else {
            setIsUserSettingsOpen(false);
            setNameInputValue('');
            setNewPhotoUser(null);
          }
        }}
      ></ButtonCircle>
      <h3 className="text-2xl px-4 text-center ml-auto mr-auto">
        Настройки пользователя
      </h3>
    </header>
  );
}

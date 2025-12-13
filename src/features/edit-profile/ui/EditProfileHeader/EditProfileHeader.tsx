import { useSettings } from '@/shared/api/store/lib/hooks';
import { useModalControls } from '@/features/confirmation/lib/use-modal-state';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import React from 'react';

interface EditProfileHeaderInterface {
  newPhoto: File | null | undefined;
  newName: string;
  setNameInputValue: React.Dispatch<React.SetStateAction<string>>;
  setNewPhotoUser: React.Dispatch<React.SetStateAction<File | null>>;
}
export function EditProfileHeader({
  newPhoto,
  newName,
  setNameInputValue,
  setNewPhotoUser,
}: EditProfileHeaderInterface) {
  const { openModal } = useModalControls();
  const { toggleSettings } = useSettings();
  return (
    <header className="w-full px-4 flex items-center mt-2">
      <ButtonCircle
        actionType="back"
        className="min-w-9"
        handlerClick={() => {
          if (newPhoto || newName) {
            openModal({
              modalType: 'exitNotSave',
              currentUserId: '',
              targetUserId: '',
              targetUserName: '',
              chatId: '',
            });
          } else {
            toggleSettings();
            setNameInputValue('');
            setNewPhotoUser(null);
          }
        }}
      ></ButtonCircle>
      <h3 className="mx-auto text-xl pr-8 text-center ml-auto mr-auto">
        Настройки пользователя
      </h3>
    </header>
  );
}

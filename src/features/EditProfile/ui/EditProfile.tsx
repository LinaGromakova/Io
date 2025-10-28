import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEditProfile } from '../hooks/useEditProfile';
import { EditUserImage } from './EditUserImage/EditUserImage';
import { EditUserName } from './EditUserName/EditUserName';
import { ButtonMain } from '@/shared/ui/ButtonMain';
import { EditProfileHeader } from './EditProfileHeader/EditProfileHeader';

export function EditProfile() {
  const user = {
    userId: '5HEzeZ4dB0iA2wJ3NdmvS',
    userName: 'Lina=',
    userImage: '/uploads/avatars/avatar-1759159994251-893137663.jpg',
    onlineStatus: false,
    lastSeen: '2025-10-13T00:49:32.751Z',
    createdAt: '2025-08-27T19:03:13.408Z',
  };
  // const { user } = useAuth();
  const {
    changeUserName,
    handleFileSelect,
    nameInputValue,
    setNameInputValue,
    newPhotoUser,
    setNewPhotoUser,
  } = useEditProfile();
  return (
    <>
      <EditProfileHeader
        newPhoto={newPhotoUser}
        newName={nameInputValue}
        setNameInputValue={setNameInputValue}
        setNewPhotoUser={setNewPhotoUser}
      ></EditProfileHeader>
      <section
        className="flex items-center mb-10 pt-6 justify-center 
      max-lg:flex-col max-md:flex-row [@media(max-width:350px)]:flex-col"
      >
        <EditUserImage
          newImage={newPhotoUser}
          user={user}
          uploadPhoto={setNewPhotoUser}
        ></EditUserImage>
        <EditUserName
          currentName={user.userName}
          value={nameInputValue}
          setState={setNameInputValue}
          handlerSave={changeUserName}
          message={user.userName === nameInputValue ? 'error' : 'base'}
        ></EditUserName>
        {newPhotoUser && (
          <ButtonMain
            actionType="applyPhoto"
            type="button"
            text="Apply Photo"
            className="max-w-1/2 mx-auto max-lg:max-w-3/4 "
            handlerClick={handleFileSelect}
          ></ButtonMain>
        )}
      </section>
    </>
  );
}

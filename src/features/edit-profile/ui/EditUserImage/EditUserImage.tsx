import { UserProfile } from '@/features/user-profile/ui';
import React from 'react';
import { UserInterface } from '@/shared/types/domain';

interface EditUserImageInterface {
  newImage: File | null;
  user: UserInterface | null;
  uploadPhoto?: React.Dispatch<React.SetStateAction<File | null>>;
}
export function EditUserImage({
  newImage,
  user,
  uploadPhoto,
}: EditUserImageInterface) {
  return (
    <UserProfile
      profileType="edit"
      newImage={newImage}
      user={user}
      uploadPhoto={uploadPhoto}
    ></UserProfile>
  );
}

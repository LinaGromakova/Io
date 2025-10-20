import { UserProfile } from '@/features/UserProfile/ui/UserProfile';
import React from 'react';
interface UserInterface {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastSeen: string;
  createdAt: string;
}
interface EditUserImageInterface {
  newImage: File | null ;
  user: UserInterface;
  uploadPhoto?: React.Dispatch<React.SetStateAction<File | null >>;
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

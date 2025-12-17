import { UserContactAvatar } from '@/shared/ui/UserContact';
import { ButtonUserProfile } from './ButtonUserProfile';
import { UserInterface } from '@/shared/types/domain';

interface UserProfileInterface {
  profileType: 'edit' | 'base';
  newImage?: File | null;
  user: UserInterface | null;
  uploadPhoto?: React.Dispatch<React.SetStateAction<File | null>>;
}
export function UserProfile({
  profileType,
  newImage,
  user,
  uploadPhoto,
}: UserProfileInterface) {
  return (
    <section className="flex items-center justify-center">
      <div className="relative">
        <UserContactAvatar
          size="big"
          name={user?.userName || ''}
          image={
            newImage ? URL.createObjectURL(newImage) : user?.userImage || null
          }
        ></UserContactAvatar>
        <ButtonUserProfile
          type={profileType}
          uploadPhoto={uploadPhoto}
        ></ButtonUserProfile>
      </div>
      {profileType !== 'edit' && (
        <div className="ml-8 overflow-hidden">
          <p className="text-xl truncate w-30">{user?.userName}</p>
          <p className="mt-0.5 text-sm opacity-50">online</p>
        </div>
      )}
    </section>
  );
}

import { UserContactAvatar } from '@/shared/ui/UserContact';
import { ButtonUserProfile } from './ButtonUserProfile';
interface UserInterface {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
  lastSeen: string;
  createdAt: string;
}
interface UserProfileInterface {
  profileType: 'edit' | 'base';
  newImage?: File | null;
  user: UserInterface;
  uploadPhoto?: React.Dispatch<React.SetStateAction<File | null>> ;
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
          name={user.userName}
          image={newImage ? URL.createObjectURL(newImage) : user.userImage}
        ></UserContactAvatar>
        <ButtonUserProfile
          type={profileType}
          uploadPhoto={uploadPhoto}
        ></ButtonUserProfile>
      </div>
      <div className="ml-8">
        <p className="text-xl">{user.userName}</p>
        <p className="mt-0.5 text-sm opacity-50">online</p>
      </div>
    </section>
  );
}

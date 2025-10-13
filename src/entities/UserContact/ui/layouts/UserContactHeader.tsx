import { UserContactAvatar } from '@/shared/ui/UserContact/UserContactAvatar';

export interface UserContactHeaderProps {
  userImage: string;
  userName: string;
  onlineStatus: boolean;
}
export function UserContactHeader(props: UserContactHeaderProps) {
  return (
    <article
      className="interface flex items-center 
    justify-between px-1 h-10"
    >
      <div className="flex items-center">
        <UserContactAvatar
          image={props.userImage}
          name={props.userName}
          size="small"
        ></UserContactAvatar>
        <div className="ml-4">
          <p className="font-bold text-md">{props.userName}</p>
          {(props.onlineStatus && (
            <p className="text-xs opacity-70">online</p>
          )) || <p className="opacity-50 text-sm">offline</p>}
        </div>
      </div>
    </article>
  );
}

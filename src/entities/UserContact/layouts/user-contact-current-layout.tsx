import clsx from 'clsx';
import { UserContactProps } from '../interfaces/layout-props';

export function UserContactCurrentLayout(props: UserContactProps) {
  return (
    <article
      className="interface flex items-center 
    justify-between px-1 h-10"
    >
      <div className="flex items-center">
        <div
          className={clsx(
            'w-10 h-10 max-h-10 relative rounded-full flex items-center justify-center',
            !props.image &&
              'bg-radial-[at_25%_25%] to-accent from-accent-shadow to-75% '
          )}
        >
          {(props.image && (
            <img
              src={`http://localhost:5000${props?.image}`}
              alt={props.name}
              className="w-full h-full object-cover rounded-full"
            ></img>
          )) || (
            <p className="text-center text-xl font-bold align-super text-white">
              {props.name?.slice(0, 1).toUpperCase()}
            </p>
          )}
        </div>
        <div className="ml-4">
          <p className="font-bold text-md">{props.name}</p>
          {(props.online && <p className="text-xs opacity-70">online</p>) || (
            <p className="opacity-50 text-sm">offline</p>
          )}
        </div>
      </div>
    </article>
  );
}

import { UserContactProps } from '../interfaces/layout-props';

export function UserContactCurrentLayout(props: UserContactProps) {
  return (
    <article
      className="interface flex items-center 
    justify-between px-1"
    >
      <div className="flex items-center">
        <div className="w-10 h-10 relative bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75%  rounded-full flex items-center justify-center">
          {(props.image && (
            <img
              src={props?.image}
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

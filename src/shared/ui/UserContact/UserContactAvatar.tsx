import { clsx } from 'clsx';
import Image from 'next/image';

interface UserContactAvatarProps {
  image: string | File | null;
  name: string;
  online?: boolean;
  size: 'base' | 'small' | 'big';
}
export function UserContactAvatar({
  image,
  name,
  online,
  size,
}: UserContactAvatarProps) {
  return (
    <div
      className={clsx(
        'relative rounded-full flex items-center justify-center',
        !image && 'bg-radial-[at_25%_25%] from-accent to-accent-shadow to-75%',
        size === 'base' && 'w-14 h-14 min-w-14 max-w-14',
        size === 'small' && 'w-10 h-10 min-w-10 max-w-10',
        size === 'big' && 'w-35 h-35 min-w-35 max-w-35'
      )}
    >
      {(image && (
        <Image
          src={image}
          alt={name}
          width={250}
          height={250}
          className="w-full h-full object-cover rounded-full"
        ></Image>
      )) || (
        <p
          className={clsx(
            'text-center font-bold text-white',
            size === 'big' && 'text-6xl',
            size === 'base' && 'text-3xl',
            size === 'small' && 'text-2xl'
          )}
        >
          {name.slice(0, 1).toUpperCase()}
        </p>
      )}

      {online && (
        <div className="w-4 h-4 bg-[#32d154] absolute bottom-0 right-1 border-background rounded-full border-2 duration-300 transition-colors group-hover/user:border-inter"></div>
      )}
    </div>
  );
}

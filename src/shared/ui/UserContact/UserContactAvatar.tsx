import { clsx } from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface UserContactAvatarProps {
  image: string | StaticImport | null;
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
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150">
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
        </filter>
      </defs>
      <rect width="150" height="150" fill="#a0a0a0" filter="url(#blur)" />
    </svg>
  `
  ).toString('base64')}`;
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
          width={150}
          height={150}
          placeholder="blur"
          blurDataURL={blurDataURL}
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

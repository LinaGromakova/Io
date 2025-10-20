import Link from 'next/link';
import { GiBurningMeteor } from 'react-icons/gi';
import { IoMdRocket } from 'react-icons/io';
import { GiSpaceSuit } from 'react-icons/gi';
import ErrorIcon from '../../public/errors-icons/404.svg';
import { ButtonMain } from '@/shared/ui/ButtonMain';

export function NotFoundPage() {
  return (
    <div className="relative flex flex-col w-full h-screen  items-center justify-center text-accent/80 overflow-hidden">
      <ErrorIcon className="z-10 w-2xl h-72 mb-17 max-sm:w-64 max-sm:mb-5" />
      <GiBurningMeteor className="absolute w-28 h-28 -left-28 -rotate-90 animate-meteor  text-accent -z-10"></GiBurningMeteor>
      <GiSpaceSuit className="absolute -bottom-28 -left-28 w-28 h-28 animate-fly text-foreground/70 -z-10"></GiSpaceSuit>
      <IoMdRocket className="absolute -bottom-36 right-1/6  w-34 h-34 animate-spaceship text-foreground/70 -z-10"></IoMdRocket>
      <Link href="/">
        <ButtonMain
          type="button"
          actionType="back"
          text="Вернуться обратно"
          handlerClick={() => null}
        ></ButtonMain>
      </Link>
    </div>
  );
}

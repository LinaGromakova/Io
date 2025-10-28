'use client';
import Link from 'next/link';
import ErrorIcon from '../../../../../public/errors-icons/404.svg';
import { ButtonMain } from '@/shared/ui/ButtonMain';
import { ERROR_ANIMATIONS } from '../../lib/constants';

export function Error404() {
  const { meteor, spacesuit, rocket } = ERROR_ANIMATIONS;
  return (
    <div className="relative flex flex-col w-full h-screen  items-center justify-center text-accent/80 overflow-hidden">
      <meteor.icon className={meteor.className} />
      <spacesuit.icon className={spacesuit.className} />
      <rocket.icon className={rocket.className} />
      <ErrorIcon className="z-10 w-2xl h-72 mb-17 max-sm:w-64 max-sm:mb-5" />
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

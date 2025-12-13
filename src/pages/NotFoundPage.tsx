'use client';
import Link from 'next/link';
import { ButtonMain } from '@/shared/ui/ButtonMain';

export function NotFoundPage() {
  return (
    <div className="relative flex flex-col w-full h-screen bg-background items-center justify-center overflow-hidden">
      <h1
        className="custom-title text-center text-[140px] mb-16 
      bg-radial-[at_50%_75%] from-accent to-accent-shadow to-90%
      bg-clip-text text-transparent"
      >
        404
        <span className="text-4xl -mt-5 block">page not found</span>
      </h1>
      <Link href="/">
        <ButtonMain
          type="button"
          actionType="back"
          text="Вернуться обратно"
          handlerClick={() => null}
          className="z-10"
        ></ButtonMain>
      </Link>
    </div>
  );
}

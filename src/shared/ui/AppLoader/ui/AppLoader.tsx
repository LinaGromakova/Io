import { Logo } from '@/shared/assets/logo';

export function AppLoader() {
  return (
    <div className='w-full h-screen bg-background flex items-center justify-center flex-col select-none'>
      <Logo className='w-1/4 max-lg:w-2/5 max-md:w-1/2 max-sm:w-8/12 h-max rounded-full logo-anim'></Logo>
    </div>
  );
}

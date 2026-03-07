import { Logo } from '@/shared/assets/logo';

export function AppLoader() {
  return (
    <div className="w-full h-screen bg-background flex items-center justify-center flex-col select-none">
      <Logo className="w-1/4 h-max rounded-full logo-anim"></Logo>
    </div>
  );
}

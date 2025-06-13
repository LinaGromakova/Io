import { JSX } from 'react';

export function HeaderContainerLayout({ children }): JSX.Element {
  return (
    <header className='flex items-center py-2 px-4 max-h-fit w-full bg-slate-800'>
      {children}
    </header>
  );
}

import { JSX } from 'react';

export function HeaderContainerLayout({ children }): JSX.Element {
  return <header className='flex items-center p-4  w-full bg-slate-800'>{children}</header>;
}

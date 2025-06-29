import React, { JSX } from 'react';

interface Props {
  children: React.ReactNode;
}
export function HeaderContainerLayout({ children }: Props): JSX.Element {
  return <header className='flex items-center px-4 py-2 w-full'>{children}</header>;
}

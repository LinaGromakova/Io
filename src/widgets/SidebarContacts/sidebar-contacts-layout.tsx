import { JSX } from 'react';
import clsx from 'clsx';
import { UserContactListLayout } from '@/entities/UserContactsList/user-contacts-list-layout';
import { Header } from '../Header/header';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';

export function SidebarContactsLayout(): JSX.Element {
  const scroll: string = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:interface
  hover:[&::-webkit-scrollbar-thumb]:interface
  [&::-webkit-scrollbar-thumb]:rounded-full`;
  return (
    <aside
      className={clsx(
        ` w-6/12 interface overflow-y-scroll relative overflow-x-hidden h-screen border-r-[1px] border-foreground/20
           group
        `,
        scroll
      )}
    >
      <Header type='SIDEBAR'></Header>
      <LayoutButtonCircle
        type='CREATE'
        className='group-hover:-translate-y-4 w-12 h-12 fixed z-30 text-xl left-[28%] bottom-0 translate-y-full'
      ></LayoutButtonCircle>

      <UserContactListLayout></UserContactListLayout>
    </aside>
  );
}

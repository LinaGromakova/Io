import { JSX } from 'react';
import clsx from 'clsx';
import { UserContactListLayout } from '@/entities/UserContactsList/user-contacts-list-layout';
import { Header } from '../Header/header';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';

export function SidebarContactsLayout(): JSX.Element {
  const scroll: string = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-slate-800
  hover:[&::-webkit-scrollbar-thumb]:bg-slate-400
  [&::-webkit-scrollbar-thumb]:rounded-full`;
  return (
    <aside
      className={clsx(
        ` w-1/3 bg-slate-800 overflow-y-scroll relative overflow-x-hidden h-screen border-r-[1px] border-white/10
           group
        `,
        scroll
      )}
    >
      <Header type='SIDEBAR'></Header>

      <LayoutButtonCircle
        type='CREATE'
        className='group-hover:-translate-y-4 w-12 h-12 fixed z-30 text-xl left-1/5 bottom-0 translate-y-full'
      ></LayoutButtonCircle>

      <UserContactListLayout></UserContactListLayout>
    </aside>
  );
}

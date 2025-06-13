import { JSX } from 'react';
import clsx from 'clsx';
import { UserContactListLayout } from '@/entities/UserContactsList/user-contacts-list-layout';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { Header } from '../Header/header';

export function SidebarContactsLayout(): JSX.Element {
  const scroll: string = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-slate-800
  hover:[&::-webkit-scrollbar-thumb]:bg-slate-400
  [&::-webkit-scrollbar-thumb]:rounded-full`;
  return (
    <aside
      className={clsx(
        ' w-1/3 bg-slate-800 overflow-y-scroll overflow-x-hidden h-screen border-r-[1px] border-white/10',
        scroll
      )}
    >
      <Header type='SIDEBAR'></Header>

      <UserContactListLayout></UserContactListLayout>
    </aside>
  );
}

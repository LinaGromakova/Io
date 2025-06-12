import { JSX } from 'react';
import clsx from 'clsx';
import { UserContactListLayout } from '@/entities/UserContactsList/user-contacts-list-layout';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';

export function SidebarContactsLayout(): JSX.Element {
  const scroll: string = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-slate-800
  hover:[&::-webkit-scrollbar-thumb]:bg-slate-400
  [&::-webkit-scrollbar-thumb]:rounded-full`;
  return (
    <aside
      className={clsx(' w-1/3 bg-slate-800 overflow-y-scroll overflow-x-hidden h-screen', scroll)}
    >
      <header className='flex items-center'>
        <InputMain
          type='search'
          purpose='MESSAGE'
          name='search'
          className='m-4 rounded-3xl flex-10/12'
        ></InputMain>
        <LayoutButtonCircle type='SEARCH'></LayoutButtonCircle>
      </header>

      <UserContactListLayout></UserContactListLayout>
    </aside>
  );
}

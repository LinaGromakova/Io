import { JSX } from 'react';
import clsx from 'clsx';
import { UserContactListLayout } from '@/entities/UserContactsList/user-contacts-list-layout';
import { Header } from '../Header/header';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';

interface ComponentProps {
  className?: string;
}
export function SidebarContactsLayout({
  className,
}: ComponentProps): JSX.Element {
  const scroll: string = `[&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:transparent
  hover:[&::-webkit-scrollbar-thumb]:transparent
  [&::-webkit-scrollbar-thumb]:rounded-full`;

  return (
    <aside
      className={clsx(
        `overflow-y-scroll relative overflow-x-hidden h-screen border-r border-r-foreground/10 group/sidebar
         max-sm:w-full max-sm:fixed bg-background z-50 max-md:w-8/12`,
        scroll,
        className
      )}
    >
      <Header type="SIDEBAR"></Header>
      <LayoutButtonCircle
        type="CREATE"
        className="sm:group-hover/sidebar:-translate-y-4 w-12 h-12 fixed z-30 text-xl 
        left-[29%] bottom-0 translate-y-full max-sm:translate-y-0 max-sm:left-auto max-sm:right-3 max-sm:bottom-3"
      ></LayoutButtonCircle>
      <UserContactListLayout></UserContactListLayout>
    </aside>
  );
}

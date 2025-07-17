import { SidebarContactsLayout } from '@/widgets/SidebarContacts/sidebar-contacts-layout';
import { clsx } from 'clsx';
import { JSX } from 'react';

interface Props {
  children?: JSX.Element | null;
}
export function MainViewLayout({ children }: Props) {
  return (
    <div className="flex overflow-y-hidden">
      <SidebarContactsLayout
        className={clsx((!!children && 'w-6/12') || 'w-4/12')}
      ></SidebarContactsLayout>
      {children}
    </div>
  );
}

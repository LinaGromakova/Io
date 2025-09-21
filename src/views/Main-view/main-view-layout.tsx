import { ConfirmModalLayout } from '@/shared/Confirm-modal/confirm-modal-layout';
import { useGlobalContext } from '@/widgets/Header/layouts/header-sidebar-layout';
import { SidebarContactsLayout } from '@/widgets/SidebarContacts/sidebar-contacts-layout';
import { SidebarOptionsLayout } from '@/widgets/SidebarOptions/sidebar-options-layout';
import { clsx } from 'clsx';

import { JSX } from 'react';
interface Props {
  children?: JSX.Element | null;
}
export function MainViewLayout({ children }: Props) {
  const { isModalOpen, isAuth } = useGlobalContext();

  return (
    <>
      {isAuth && (
        <div className="flex overflow-y-hidden relative">
          <ConfirmModalLayout
            id={isModalOpen.id}
            name={isModalOpen.name}
          ></ConfirmModalLayout>
          <SidebarOptionsLayout></SidebarOptionsLayout>
          <SidebarContactsLayout
            className={clsx((!!children && 'w-6/12') || 'w-4/12')}
          ></SidebarContactsLayout>

          {children}
        </div>
      )}
    </>
  );
}

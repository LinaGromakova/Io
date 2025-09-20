import { ConfirmModalLayout } from '@/shared/Confirm-modal/confirm-modal-layout';
import { useGlobalContext } from '@/widgets/Header/layouts/header-sidebar-layout';
import { SidebarContactsLayout } from '@/widgets/SidebarContacts/sidebar-contacts-layout';
import { SidebarOptionsLayout } from '@/widgets/SidebarOptions/sidebar-options-layout';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';

import { JSX, useEffect, useState } from 'react';
interface Props {
  children?: JSX.Element | null;
}
export function MainViewLayout({ children }: Props) {
  const { isModalOpen } = useGlobalContext();
  const [isAuth, setIsAuth] = useState(false);

  const router = useRouter();
  async function checkSession() {
    try {
      const data = await fetch('http://localhost:5000/session-check', {
        credentials: 'include',
      });
      if (data.status === 401) {
        return await data.json();
      } else {
        const response = await data.json();
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    checkSession().then((res) => {
      if (res === 401) {
        setIsAuth(false);
        router.replace('/login');
      } else {
        setIsAuth(true);
      }
    });
  }, [router]);

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

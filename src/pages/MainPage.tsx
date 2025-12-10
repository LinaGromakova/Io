'use client';
import { useSidebar } from '@/features/interface-state/lib/hooks';
import { useModalSettings } from '@/features/modal/lib/useModalSettings';
import { useModalState } from '@/features/modal/lib/useModalState';
import { ConfirmModal } from '@/shared/ui/Modals';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';
import { useParams } from 'next/navigation';
import { useLayoutEffect } from 'react';

interface MainPageProps {
  children?: React.ReactNode;
}
export function MainPage({ children }: MainPageProps) {
  const { modalSettings } = useModalSettings();
  const { isModalOpen } = useModalState();
  const { setSidebarOpen } = useSidebar();
  const params = useParams();
  useLayoutEffect(() => {
    if (params?.id) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [params]);
  return (
    <div className="wrapper">
      <div className="flex overflow-hidden relative h-screen ">
        <ConfirmModal
          id={isModalOpen.currentUserId}
          name={isModalOpen.targetUserName}
          isOpen={isModalOpen.isOpen}
          confirmType={isModalOpen.modalType}
          modalSettings={modalSettings}
        />
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

'use client';
import { useSidebar } from '@/shared/api/store/lib/hooks';
import { useModalSettings } from '@/features/confirmation/lib/use-modal-settings';
import { useModalState } from '@/features/confirmation/lib/use-modal-state';
import { ConfirmModal } from '@/shared/ui/Modals';
import { Sidebar } from '@/widgets/Sidebar/ui';
import { useParams } from 'next/navigation';
import { useLayoutEffect } from 'react';

interface MainPageProps {
  children?: React.ReactNode;
}
export default function MainPage({ children }: MainPageProps) {
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

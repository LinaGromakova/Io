'use client';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useModalContext, useThemeContext } from '@/features/common/contexts';

import { ConfirmModal } from '@/shared/ui/Modals';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';

interface MainPageProps {
  children?: React.ReactNode;
}
export function MainPage({ children }: MainPageProps) {
  const { isAuth } = useAuth();
  const { isModalOpen, modalActions } = useModalContext();
  const { theme } = useThemeContext();

  if (!isAuth) return null;

  return (
    <div
      className={
        theme === 'dark'
          ? 'bg-gradient-to-t from-[#373942] to-[#101113]'
          : 'bg-gradient-to-t to-[#fafafa] from-[#9aa6b2]'
      }
    >
      <div className="flex overflow-y-hidden relative h-screen">
        <ConfirmModal
          id={isModalOpen.currentUserId}
          name={isModalOpen.targetUserName}
          isOpen={isModalOpen.isOpen}
          confirmType={isModalOpen.modalType}
          modalSettings={modalActions}
        />

        <Sidebar />
        {children}
      </div>
    </div>
  );
}

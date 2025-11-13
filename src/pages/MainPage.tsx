'use client';
import { useModalSettings } from '@/features/modal/lib/useModalSettings';
import { useModalState } from '@/features/modal/lib/useModalState';
import { useTheme } from '@/features/theme/hooks/useTheme';
import { ConfirmModal } from '@/shared/ui/Modals';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';

interface MainPageProps {
  children?: React.ReactNode;
}
export function MainPage({ children }: MainPageProps) {
  const { modalSettings } = useModalSettings();
  const { isModalOpen } = useModalState();
  const { theme } = useTheme();
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
          modalSettings={modalSettings}
        />
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

'use client';
import { useUiContext } from '@/features/common/contexts';
import { ModalMessage } from '@/shared/ui/Modals';
export default function Template({ children }: { children: React.ReactNode }) {
  const { isModalMessageOpen, setIsModalMessageOpen } = useUiContext();
  return (
    <>
      {children}
      <ModalMessage
        {...isModalMessageOpen}
        isModalOpen={isModalMessageOpen.open}
        setIsModalOpen={setIsModalMessageOpen}
      />
    </>
  );
}

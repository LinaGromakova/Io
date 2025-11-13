'use client';
import { useModalMessage } from '@/features/interface-state/lib/hooks';
import { ModalMessage } from '@/shared/ui/Modals';

export default function Template({ children }: { children: React.ReactNode }) {
  const modal = useModalMessage();

  // const initSocket = useSetAtom(initSocketAtom);
  // useEffect(() => {
  //   initSocket();
  // }, []);

  return (
    <>
      {children}
      <ModalMessage
        message={modal.state.message}
        isOpen={modal.state.open}
        onClose={modal.close}
      />
    </>
  );
}

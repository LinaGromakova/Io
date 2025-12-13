import { BlackList } from '@/features/blacklist/ui';
import { SidebarHeaderBack } from './SidebarHeaderBack';

interface SidebarBlackListProps {
  setIsBlackListOpen: (isOpen: boolean) => void;
}
export function SidebarBlackList({
  setIsBlackListOpen,
}: SidebarBlackListProps) {
  return (
    <>
      <SidebarHeaderBack handlerBack={() => setIsBlackListOpen(false)}>
        <h3 className="mx-auto text-xl pr-8">Чёрный список</h3>
      </SidebarHeaderBack>
      <section>
        <BlackList></BlackList>
      </section>
    </>
  );
}

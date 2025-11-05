import { BlackList } from '@/features/blacklist/ui/BlackList';
import { SidebarHeaderBack } from './SidebarHeaderBack';

export function SidebarBlackList(props) {
  return (
    <>
      <SidebarHeaderBack handlerBack={() => props.setIsBlackListOpen(false)}>
        <h3 className="mx-auto text-xl pr-8">Чёрный список</h3>
      </SidebarHeaderBack>
      <section>
        <BlackList></BlackList>
      </section>
    </>
  );
}

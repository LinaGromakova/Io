import { BlackList } from '@/features/blacklist/ui/BlackList';
import { SidebarHeaderBack } from './SidebarHeaderBack';


export function SidebarBlackList(props) {

  return (
    <>
      <SidebarHeaderBack
        handlerBack={() => props.setIsBlackListOpen(false)}
      ></SidebarHeaderBack>
      <h3 className="mx-auto text-xl pr-8">Чёрный список</h3>
      <section>
        <BlackList></BlackList>
      </section>
    </>
  );
}

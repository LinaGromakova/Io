
import { ButtonCircle } from '@/shared/ui/ButtonCircle';

export function SidebarHeaderBack({handlerBack}) {
  return (
    <header className="w-full px-4 py-2">
      <ButtonCircle
        actionType="back"
        handlerClick={() => handlerBack()}
      ></ButtonCircle>
    </header>
  );
}

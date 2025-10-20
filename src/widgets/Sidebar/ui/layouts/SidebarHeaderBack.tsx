import { useUiContext } from '@/features/common/contexts';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';

export function SidebarHeaderBack() {
  const { toggleOptionsSidebar } = useUiContext();
  return (
    <header className="w-full px-4 py-2">
      <ButtonCircle
        actionType="back"
        handlerClick={() => toggleOptionsSidebar()}
      ></ButtonCircle>
    </header>
  );
}

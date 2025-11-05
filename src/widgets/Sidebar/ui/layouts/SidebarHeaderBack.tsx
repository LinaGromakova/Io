import { ButtonCircle } from '@/shared/ui/ButtonCircle';

export function SidebarHeaderBack({ handlerBack, children }) {
  return (
    <header className="w-full px-4 py-2 flex">
      <ButtonCircle
        actionType="back"
        handlerClick={() => handlerBack()}
      ></ButtonCircle>
      {children}
    </header>
  );
}

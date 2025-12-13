import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import React from 'react';

interface SidebarHeaderBackInterface {
  handlerBack: () => void;
  children?: React.ReactNode;
}
export function SidebarHeaderBack({
  handlerBack,
  children,
}: SidebarHeaderBackInterface) {
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

import { JSX } from 'react';
import { HeaderContainerLayout } from './layouts/header-container-layout';
import { HeaderMainLayout } from './layouts/header-main-layout';
import { HeaderSidebarLayout } from './layouts/header-sidebar-layout';

interface HeaderProps {
  type: 'SIDEBAR' | 'HEADER_MAIN';
}
export function Header({ type }: HeaderProps): JSX.Element {
  return (
    <HeaderContainerLayout>
      {(type === 'SIDEBAR' && <HeaderSidebarLayout></HeaderSidebarLayout>) || (
        <HeaderMainLayout></HeaderMainLayout>
      )}
    </HeaderContainerLayout>
  );
}

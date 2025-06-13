import { JSX } from 'react';
import { HeaderContainerLayout } from './layouts/header-container-layout';
import { HeaderMainLayout } from './layouts/header-main-layout';
import { HeaderSidebarLayout } from './layouts/header-sidebar-layout';

export function Header({ type }: 'SIDEBAR' | 'HEADER_MAIN'): JSX.Element {
  return (
    <HeaderContainerLayout>
      {(type === 'SIDEBAR' && <HeaderSidebarLayout></HeaderSidebarLayout>) || (
        <HeaderMainLayout></HeaderMainLayout>
      )}
    </HeaderContainerLayout>
  );
}

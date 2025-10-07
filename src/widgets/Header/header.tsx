import { HeaderContainerLayout } from './layouts/header-container-layout';
import { HeaderMainLayout } from './layouts/header-main-layout';
import { HeaderSidebarLayout } from './layouts/header-sidebar-layout';

interface HeaderProps {
  type: 'SIDEBAR' | 'HEADER_MAIN';
}
export function Header({ type }: HeaderProps) {
  return (
    <HeaderContainerLayout className={type !== 'SIDEBAR' ? 'h-[60px]' : ''}>
      {(type === 'SIDEBAR' && <HeaderSidebarLayout></HeaderSidebarLayout>) || (
        <HeaderMainLayout></HeaderMainLayout>
      )}
    </HeaderContainerLayout>
  );
}

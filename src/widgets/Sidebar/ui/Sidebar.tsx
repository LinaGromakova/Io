import clsx from 'clsx';
import { SidebarChatList } from './layouts/SidebarChatList';
import { SidebarBlackList } from './layouts/SidebarBlackList';
import { SidebarOptionsList } from './layouts/SidebarOptionsList';
import { SidebarSettingsUser } from './layouts/SidebarSettingsUser';
import { useUiContext } from '@/features/common/contexts';

export function Sidebar() {
  const ui = useUiContext();

  const getCurrentView = () => {
    if (ui.isBlackListOpen) return <SidebarBlackList />;
    if (ui.isOptionsSidebarOpen) return <SidebarOptionsList />;
    if (ui.isUserSettingsOpen) return <SidebarSettingsUser />;
    return <SidebarChatList />;
  };
  return (
    <aside
      className={clsx(
        `overflow-y-scroll relative overflow-x-hidden h-screen group/sidebar
             max-md:w-full max-md:fixed bg-background z-50 scrollbar-custom`,
        !ui.isSidebarOpen && 'max-md:hidden'
      )}
    >
      {getCurrentView()}
    </aside>
  );
}

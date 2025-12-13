import clsx from 'clsx';
import { SidebarChatList } from './layouts/SidebarChatList';
import { SidebarBlackList } from './layouts/SidebarBlackList';
import { SidebarOptionsList } from './layouts/SidebarOptionsList';
import { SidebarSettingsUser } from './layouts/SidebarSettingsUser';
import {
  useBlackListState,
  useOptions,
  useSettings,
  useSidebar,
} from '@/shared/api/store/lib/hooks';

export function Sidebar() {
  const { isSettingsOpen } = useSettings();
  const { isBlackListOpen, toggleBlackList } = useBlackListState();
  const { isSidebarOpen } = useSidebar();
  const { isOptionsSidebarOpen, toggleSidebarOptions } = useOptions();

  const getCurrentView = () => {
    if (isSettingsOpen) return <SidebarSettingsUser />;
    if (isBlackListOpen)
      return <SidebarBlackList setIsBlackListOpen={toggleBlackList} />;
    if (isOptionsSidebarOpen)
      return (
        <SidebarOptionsList setIsOptionsSidebarOpen={toggleSidebarOptions} />
      );

    return <SidebarChatList />;
  };
  
  return (
    <aside
      className={clsx(
        `overflow-y-scroll relative overflow-x-hidden h-screen group/sidebar min-lg:min-w-md min-lg:w-md max-md:min-w-full
        max-md:w-full max-md:fixed bg-background z-50 scrollbar-custom px-1 max-lg:w-1/2`,
        !isSidebarOpen && 'max-md:hidden',
        isSidebarOpen && 'max-md:block'
      )}
    >
      {getCurrentView()}
    </aside>
  );
}

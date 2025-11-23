import clsx from 'clsx';
import { SidebarChatList } from './layouts/SidebarChatList';
import { SidebarBlackList } from './layouts/SidebarBlackList';
import { SidebarOptionsList } from './layouts/SidebarOptionsList';
import { SidebarSettingsUser } from './layouts/SidebarSettingsUser';
import {
  useBlackListState,
  useSettings,
  useSidebar,
  useOptions,
} from '@/features/interface-state/lib/hooks';

export function Sidebar() {
  const { isSettingsOpen } = useSettings();
  const { isBlackListOpen, toggleBlackList } = useBlackListState();
  const isSidebarOpen = useSidebar();
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
  console.log('sidebar');
  return (
    <aside
      className={clsx(
        `overflow-y-scroll relative overflow-x-hidden h-screen group/sidebar min-w-3/12 w-3/12
             max-md:w-full max-md:fixed bg-background z-50 scrollbar-custom max-lg:min-w-6/12 px-1`,
        !isSidebarOpen && 'max-md:hidden'
      )}
    >
      {getCurrentView()}
    </aside>
  );
}

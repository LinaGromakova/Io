import clsx from 'clsx';
import { SidebarChatList } from './layouts/SidebarChatList';
import { SidebarBlackList } from './layouts/SidebarBlackList';
import { SidebarOptionsList } from './layouts/SidebarOptionsList';
import { SidebarSettingsUser } from './layouts/SidebarSettingsUser';
import { useUiContext } from '@/features/common/contexts';

export function Sidebar() {
  const {
    isUserSettingsOpen,
    setIsBlackListOpen,
    isBlackListOpen,
    isOptionsSidebarOpen,
    setIsOptionsSidebarOpen,
    isSidebarOpen,
    isAddUserOpen,
    setIsAddUserOpen,
  } = useUiContext();

  const getCurrentView = () => {
    if (isBlackListOpen)
      return <SidebarBlackList setIsBlackListOpen={setIsBlackListOpen} />;
    if (isOptionsSidebarOpen)
      return (
        <SidebarOptionsList setIsOptionsSidebarOpen={setIsOptionsSidebarOpen} />
      );
    if (isUserSettingsOpen) return <SidebarSettingsUser />;
    return (
      <SidebarChatList
        isAddUserOpen={isAddUserOpen}
        setIsAddUserOpen={setIsAddUserOpen}
      />
    );
  };
  return (
    <aside
      className={clsx(
        `overflow-y-scroll relative overflow-x-hidden h-screen group/sidebar
             max-md:w-full max-md:fixed bg-background z-50 scrollbar-custom`,
        !isSidebarOpen && 'max-md:hidden'
      )}
    >
      {getCurrentView()}
    </aside>
  );
}

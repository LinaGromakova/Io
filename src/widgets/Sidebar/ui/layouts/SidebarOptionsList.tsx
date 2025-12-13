import { SidebarHeaderBack } from './SidebarHeaderBack';
import { useAuthState } from '@/features/auth/lib/hooks';
import { OptionsList } from '@/features/settings-option/ui';
import { UserProfile } from '@/features/user-profile/ui';

interface SidebarOptionsListProps {
  setIsOptionsSidebarOpen: (isOpen: boolean) => void;
}

export function SidebarOptionsList({
  setIsOptionsSidebarOpen,
}: SidebarOptionsListProps) {
  const { user } = useAuthState();

  return (
    <>
      <SidebarHeaderBack
        handlerBack={() => setIsOptionsSidebarOpen(false)}
      ></SidebarHeaderBack>
      <UserProfile profileType="base" user={user}></UserProfile>
      <OptionsList></OptionsList>
    </>
  );
}

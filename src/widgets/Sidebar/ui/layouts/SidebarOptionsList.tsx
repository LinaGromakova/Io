import { OptionsList } from '@/features/settingsOption/ui/OptionsList/OptionsList';
import { UserProfile } from '@/features/UserProfile/ui/UserProfile';
import { SidebarHeaderBack } from './SidebarHeaderBack';
import { useAuthState } from '@/features/auth/lib/useAuthState';

export function SidebarOptionsList(props) {
  const { user } = useAuthState();
  return (
    <>
      <SidebarHeaderBack
        handlerBack={() => props.setIsOptionsSidebarOpen(false)}
      ></SidebarHeaderBack>
      <UserProfile profileType="base" user={user}></UserProfile>
      <OptionsList></OptionsList>
    </>
  );
}

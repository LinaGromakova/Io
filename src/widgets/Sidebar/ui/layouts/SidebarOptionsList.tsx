import { OptionsList } from '@/features/settingsOption/ui/OptionsList/OptionsList';
import { UserProfile } from '@/features/UserProfile/ui/UserProfile';
import { SidebarHeaderBack } from './SidebarHeaderBack';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function SidebarOptionsList() {
  const { user } = useAuth();
  return (
    <>
      <SidebarHeaderBack></SidebarHeaderBack>
      <UserProfile profileType="base" user={user}></UserProfile>
      <OptionsList></OptionsList>
    </>
  );
}

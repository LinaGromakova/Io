import { OptionsList } from '@/features/settingsOption/ui/OptionsList/OptionsList';
import { UserProfile } from '@/features/UserProfile/ui/UserProfile';
import { SidebarHeaderBack } from './SidebarHeaderBack';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useUiContext } from '@/features/common/contexts';

export function SidebarOptionsList(props) {
  // const { user } = useAuth();
  const user = {
    userId: '5HEzeZ4dB0iA2wJ3NdmvS',
    userName: 'Lina=',
    userImage: '/uploads/avatars/avatar-1759159994251-893137663.jpg',
    onlineStatus: false,
    lastSeen: '2025-10-13T00:49:32.751Z',
    createdAt: '2025-08-27T19:03:13.408Z',
  };

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

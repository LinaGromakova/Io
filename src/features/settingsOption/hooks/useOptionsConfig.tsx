import { IoSunnyOutline as SunIcon } from 'react-icons/io5';
import { IoMoonOutline as MoonIcon } from 'react-icons/io5';
import { MdBlock as BlockIcon } from 'react-icons/md';
import { IoIosLogOut as LogOutIcon } from 'react-icons/io';
import {
  useModalContext,
  useThemeContext,
  useUiContext,
} from '@/features/common/contexts';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function useOptionsConfig() {
  // const { user } = useAuth();
  const user = {
    userId: '5HEzeZ4dB0iA2wJ3NdmvS',
    userName: 'Lina=',
    userImage: '/uploads/avatars/avatar-1759159994251-893137663.jpg',
    onlineStatus: false,
    lastSeen: '2025-10-13T00:49:32.751Z',
    createdAt: '2025-08-27T19:03:13.408Z',
  };
  const { theme, changeTheme } = useThemeContext();
  const { changeModalView } = useModalContext();
  const { setIsBlackListOpen } = useUiContext();
  const optionsConfig = [
    {
      icon:
        theme === 'light' ? (
          <SunIcon className="text-xl" />
        ) : (
          <MoonIcon className="text-xl" />
        ),
      text: theme,
      handlerClick: () => changeTheme(),
    },
    {
      icon: <BlockIcon className="text-xl" />,
      text: 'Чёрный список',
      handlerClick: () => setIsBlackListOpen(true),
    },
    {
      icon: <LogOutIcon className="text-xl" />,
      text: 'Выйти',
      handlerClick: () =>
        changeModalView({
          modalType: 'unLogin',
          currentUserId: '',
          targetUserId: '',
          targetUserName: user.userName,
          chatId: '',
        }),
    },
  ];
  return { optionsConfig };
}

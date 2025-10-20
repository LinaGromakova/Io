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
  const { user } = useAuth();
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

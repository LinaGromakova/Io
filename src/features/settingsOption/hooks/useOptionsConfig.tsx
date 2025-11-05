import { IoSunnyOutline as SunIcon } from 'react-icons/io5';
import { IoMoonOutline as MoonIcon } from 'react-icons/io5';
import { MdBlock as BlockIcon } from 'react-icons/md';
import { IoIosLogOut as LogOutIcon } from 'react-icons/io';
import { useBlackList } from '@/features/interface-state/lib/hooks';
import { useTheme } from '@/features/theme/hooks/useTheme';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import { useModalControls } from '@/features/modal/lib/useModalState';

export function useOptionsConfig() {
  const { user } = useAuthState();
  const { theme, toggleTheme } = useTheme();
  const { openModal } = useModalControls();
  const { toggleBlackList } = useBlackList();
  const optionsConfig = [
    {
      icon:
        theme === 'light' ? (
          <SunIcon className="text-xl" />
        ) : (
          <MoonIcon className="text-xl" />
        ),
      text: theme,
      handlerClick: () => toggleTheme(),
    },
    {
      icon: <BlockIcon className="text-xl" />,
      text: 'Чёрный список',
      handlerClick: () => toggleBlackList(),
    },
    {
      icon: <LogOutIcon className="text-xl" />,
      text: 'Выйти',
      handlerClick: () =>
        openModal({
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

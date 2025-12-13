import {
  BlockIcon,
  LogIcon as LogOutIcon,
  MoonIcon,
  SunIcon,
} from '@/shared/assets/icons';
import { useBlackListState } from '@/shared/api/store/lib/hooks';
import { useAuthState } from '@/features/auth/lib/hooks';
import { useModalControls } from '@/features/confirmation/lib/use-modal-state';
import { useTheme } from '@/features/theme/hooks/useTheme';

export function useOptionsConfig() {
  const { user } = useAuthState();
  const { theme, toggleTheme } = useTheme();
  const { openModal } = useModalControls();
  const { toggleBlackList } = useBlackListState();
  const optionsConfig = [
    {
      icon: theme === 'light' ? <SunIcon className="text-xl" /> : <MoonIcon />,
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
          targetUserName: user?.userName,
          chatId: '',
        }),
    },
  ];
  return { optionsConfig };
}

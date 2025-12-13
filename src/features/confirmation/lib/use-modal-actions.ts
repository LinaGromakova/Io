import { useSetAtom } from 'jotai';
import { closeModalAtom } from '../model/atoms';
import { useAuthSetters } from '@/features/auth/lib/hooks/use-auth-state';
import { useAuthActions } from '@/features/auth/lib/hooks';
import { useLocalStorage } from '@/shared/lib/hooks';
import { useRouter } from 'next/navigation';
import { deleteChat } from '@/shared/api/chat';
import { blockUser, unblockUser } from '@/features/blacklist/lib/api';
import {
  useModalMessage,
  useOptions,
  useSettings,
} from '@/shared/api/store/lib/hooks';

export const useModalActions = () => {
  const router = useRouter();
  const { setIsAuth } = useAuthSetters();
  const { logOutUser } = useAuthActions();
  const { removeUserData } = useLocalStorage();
  const { toggleSidebarOptions } = useOptions();
  const { open: openMessage, state } = useModalMessage();
  const { toggleSettings } = useSettings();
  const closeModal = useSetAtom(closeModalAtom);

  const handleUnlogin = () => {
    closeModal();
    removeUserData();
    setIsAuth(false);
    logOutUser();
    toggleSidebarOptions();
  };

  const handleUnblock = (currentUserId: string, targetUserId: string) => {
    unblockUser(currentUserId, targetUserId);
    closeModal();
  };

  const handleBlock = (currentUserId: string, targetUserId: string) => {
    blockUser(currentUserId, targetUserId);
    closeModal();
  };

  const handleDeleteChat = (chatId: string) => {
    router.push('/');
    deleteChat(chatId);
    closeModal();
    if (!state.open) {
      openMessage('Чат успешно удален!');
    }
  };

  const handleExitNotSave = () => {
    toggleSettings();
    closeModal();
  };

  return {
    handleUnlogin,
    handleUnblock,
    handleBlock,
    handleDeleteChat,
    handleExitNotSave,
  };
};

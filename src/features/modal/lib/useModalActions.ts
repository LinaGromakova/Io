import { useSetAtom } from 'jotai';
import { useActions } from '@/features/actions/lib/hooks';
import { closeModalAtom } from '../model/atoms';
import { useAuthSetters } from '@/features/auth/lib/useAuthState';
import { useAuthActions } from '@/features/auth/lib/useAuthActions';
import { useChatSetters } from '@/features/chat/lib/useChatState';
import { useLocalStorage } from '@/shared/lib/hooks';
import {
  useModalMessage,
  useOptions,
  useSettings,
} from '@/features/interface-state/lib/hooks';

export const useModalActions = () => {
  const { setIsAuth } = useAuthSetters();
  const { logOutUser } = useAuthActions();
  const { removeUserData } = useLocalStorage();
  const { toggleSidebarOptions } = useOptions();
  const { open: openMessage } = useModalMessage();
  const { toggleSettings } = useSettings();
  const { setIsBlock } = useChatSetters();
  const { deleteUserChat, unBlockUser, blockUser } = useActions();
  const closeModal = useSetAtom(closeModalAtom);

  const handleUnlogin = () => {
    closeModal();
    removeUserData();
    setIsAuth(false);
    logOutUser();
    toggleSidebarOptions();
  };

  const handleUnblock = (currentUserId: string, targetUserId: string) => {
    unBlockUser(currentUserId, targetUserId);
    closeModal();
  };

  const handleBlock = (currentUserId: string, targetUserId: string) => {
    blockUser(currentUserId, targetUserId);
    closeModal();
  };

  const handleDeleteChat = (chatId: string) => {
    deleteUserChat(chatId);
    closeModal();
    openMessage('Чат успешно удален!');
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

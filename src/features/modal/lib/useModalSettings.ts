import { useModalControls, useModalState } from './useModalState';
import { useModalActions } from './useModalActions';

export const useModalSettings = () => {
  const { isModalOpen } = useModalState();

  const {
    handleUnlogin,
    handleUnblock,
    handleBlock,
    handleDeleteChat,
    handleExitNotSave,
  } = useModalActions();
  const { closeModal } = useModalControls();

  const modalSettings = {
    unLogin: {
      message: (currentUserName: string) =>
        `Вы точно хотите выйти из аккаунта, ${currentUserName}?`,
      handlerCancel: () => {
        closeModal();
      },
      handlerOk: () => handleUnlogin(),
    },
    unBlock: {
      message: () =>
        `Вы точно хотите разблокировать пользователя ${isModalOpen.targetUserName}?`,
      handlerCancel: () => {
        closeModal();
      },
      handlerOk: () =>
        
        handleUnblock(isModalOpen.currentUserId, isModalOpen.targetUserId),
    },
    block: {
      message: () =>
        `Вы точно хотите заблокировать пользователя ${isModalOpen.targetUserName}?`,
      handlerCancel: () => {
        closeModal();
      },
      handlerOk: () =>
        handleBlock(isModalOpen.currentUserId, isModalOpen.targetUserId),
    },
    deleteChat: {
      message: () =>
        `Вы точно хотите удалить чат с ${isModalOpen.targetUserName}?`,
      handlerCancel: () => {
        closeModal();
      },
      handlerOk: () => {
  
        handleDeleteChat(isModalOpen.chatId);
      },
    },
    exitNotSave: {
      message: () => 'Вы точно хотите вернуться? Изменения не сохранены',
      handlerCancel: () => {
        closeModal();
      },
      handlerOk: () => {
        handleExitNotSave();
      },
    },
  };

  return { modalSettings };
};

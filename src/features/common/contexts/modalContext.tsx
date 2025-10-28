'use client';
import { useRouter } from 'next/router';
import React from 'react';
import { useActionContext } from './actionContext';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLocalStorage } from '@/shared/lib/hooks';
import { useUiContext } from './uiContext';
import { useChatContext } from '../../chat/context/chatContext';

interface ModalConfig {
  message: (arg0: string) => string;
  handlerCancel: () => void;
  handlerOk: (chat_id: string) => void;
}
interface ModalData {
  isOpen: boolean;
  modalType: string;
  currentUserId: string;
  targetUserId: string;
  targetUserName: string;
  chatId: string;
}
interface ModalContextInterface {
  isModalOpen: ModalData;
  modalActions: Record<string, ModalConfig>;
  changeModalView: ({ ...arg }: ModalData) => void;
}
export const ModalContext = React.createContext<ModalContextInterface>(null!);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  // const router = useRouter();
  const { logOutUser, setIsAuth } = useAuth();
  const { removeUserData } = useLocalStorage();
  const {
    setIsOptionsSidebarOpen,
    setIsModalMessageOpen,
    setIsUserSettingsOpen,
  } = useUiContext();
  const { setIsBlock } = useChatContext();
  const { deleteUserChat, unBlockUser, blockUser } = useActionContext();
  const [isModalOpen, setIsModalOpen] = React.useState<ModalData>({
    isOpen: false,
    modalType: '',
    currentUserId: '',
    targetUserId: '',
    targetUserName: '',
    chatId: '',
  });

  const modalActions = {
    unLogin: {
      message: function (currentUserName: string) {
        return `Вы точно хотите выйти из аккаунта, ${currentUserName}?`;
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function () {
        setIsAuth(false);
        logOutUser();
        removeUserData();
        // router.replace('/login');
        changeModalView();
        setIsOptionsSidebarOpen(false);
      },
    },
    unBlock: {
      message: function () {
        return `Вы точно хотите разблокировать пользователя ${isModalOpen.targetUserName}?`;
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function () {
        unBlockUser(isModalOpen.currentUserId, isModalOpen.targetUserId);
        setIsBlock(false);
        changeModalView();
      },
    },
    block: {
      message: function () {
        return `Вы точно хотите заблокировать пользователя ${isModalOpen.targetUserName}?`;
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function () {
        blockUser(isModalOpen.currentUserId, isModalOpen.targetUserId);
        changeModalView();
      },
    },
    deleteChat: {
      message: function () {
        return `Вы точно хотите удалить чат с ${isModalOpen.targetUserName}?`;
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function () {
        deleteUserChat(isModalOpen.chatId);
        changeModalView();
        setIsModalMessageOpen({
          message: 'Чат успешно удален!',
          open: true,
        });
        // router.replace('/');
      },
    },
    exitNotSave: {
      message: function () {
        return 'Вы точно хотите вернуться? Изменения не сохранены';
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function () {
        setIsUserSettingsOpen(false);
        changeModalView();
      },
    },
  };

  function changeModalView(params?: Partial<ModalData>) {
    setIsModalOpen((prev) => ({
      ...prev,
      ...params,
      isOpen: !prev.isOpen,
    }));
  }

  const value = { modalActions, isModalOpen, changeModalView };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModalContext(): ModalContextInterface {
  return React.useContext(ModalContext);
}

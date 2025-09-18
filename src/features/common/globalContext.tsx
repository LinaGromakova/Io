import { useRouter } from 'next/router';
import React, { useState } from 'react';

type ModalKey = string;

interface ModalConfig {
  message: (arg0: string) => string;
  handlerCancel: () => void;
  handlerOk: (chat_id: string) => void;
}

type ModalMessageTypeState = {
  message: string;
  open: boolean;
};
interface GlobalContextInterface {
  currentUser: CurrentUserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserInterface>>;
  theme: 'light' | 'dark';
  changeTheme: () => void;
  filterUsers: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  openOptions: () => void;
  isOpen: boolean;
  isModalOpen: ModalData;
  changeModalView: (
    actionType?: string,
    currentId?: string,
    id_2?: string,
    currentName?: string
  ) => void;
  modalSettings: Record<ModalKey, ModalConfig>;
  isModalMessageOpen: ModalMessageTypeState;
  setIsModalMessageOpen: React.Dispatch<
    React.SetStateAction<ModalMessageTypeState>
  >;
  arrTest: number[];
  setArrTest: React.Dispatch<React.SetStateAction<number[]>>;
  bubbleMenuOpen: (
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  sidebarIsOpen: boolean;
  setSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNewUsersOpen: boolean;
  setAddNewUsersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchUser: string;
  setSearchUser: React.Dispatch<React.SetStateAction<string>>;
  user: UserInterface;
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  isOpenSettingsUser: boolean;
  setIsOpenSettingUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = React.createContext<GlobalContextInterface>(null!);

interface User {
  id: string;
  image: string;
  name: string;
  online: boolean;
}
interface ModalData {
  open: boolean;
  type: string;
  id: string;
  name: string;
  id_2?: string;
}
interface UserInterface {
  id: string;
  name: string;
  login: string;
  image: string;
  online: boolean;
  last_seen: string;
  created_at: string;
}
interface CurrentUserInterface {
  id: string;
  name: string;
  login: string;
  image: string;
  online: boolean;
  last_seen: string;
}
export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');
  const [filter, setFilter] = React.useState('');

  const [users, setUsers] = React.useState<User[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);
  const [addNewUsersOpen, setAddNewUsersOpen] = React.useState(false);
  const [searchUser, setSearchUser] = React.useState('');
  const [isOpenSettingsUser, setIsOpenSettingUser] = useState(false);
  const [isModalMessageOpen, setIsModalMessageOpen] = useState({
    message: '',
    open: false,
  });
  const [isModalOpen, setIsModalOpen] = React.useState<ModalData>({
    open: false,
    type: '',
    id: '',
    name: '',
    id_2: '',
  });
  const [arrTest, setArrTest] = useState([1, 2, 3, 4, 5]);
  const [user, setUser] = useState<UserInterface>({
    id: '5HEzeZ4dB0iA2wJ3NdmvS',
    name: 'lina',
    login: 'lina',
    image: '',
    online: true,
    last_seen: '2025-08-31T17:02:24.270Z',
    created_at: '2025-08-27T19:03:13.408Z',
  });
  const [currentUser, setCurrentUser] = useState<CurrentUserInterface>({
    id: '',
    name: '',
    login: '',
    image: '',
    online: false,
    last_seen: '',
  });
  const modalSettings: Record<ModalKey, ModalConfig> = {
    unLogin: {
      message: function (currentNameUser: string) {
        return `Вы точно хотите выйти из аккаунта, ${currentNameUser}?`;
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function () {
        console.log('unlogin');
        changeModalView();
      },
    },
    unBlock: {
      message: function () {
        return `Вы точно хотите разблокировать пользователя ${isModalOpen.name}?`;
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function () {
        unBlockUser(user.id, isModalOpen.id);
        changeModalView();
      },
    },
    block: {
      message: function () {
        return `Вы точно хотите заблокировать пользователя ${isModalOpen.name}?`;
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function () {
        blockUser(user.id, isModalOpen.id_2);
        changeModalView();
      },
    },

    deleteChat: {
      message: function () {
        return `Вы точно хотите удалить чат с ${isModalOpen.name}?`;
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function () {
        deleteUserChat(isModalOpen.id);

        changeModalView();
        setIsModalMessageOpen({
          message: 'Чат успешно удален!',
          open: true,
        });
        router.replace('/');
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
        setIsOpenSettingUser(false);
        changeModalView();
      },
    },
  };
  async function deleteUserChat(chat_id: string) {
    try {
      const data = await fetch(`http://localhost:5000/delete_chat/${chat_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await data.json();
      console.log('Delete:', result);
      return result;
    } catch (error) {
      console.log(error, 'Delete error');
    }
  }
  async function unBlockUser(user_id: string, blocked_user_id: string) {
    try {
      const data = await fetch(
        `http://localhost:5000/delete_user_blacklist/${user_id}/${blocked_user_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await data.json();
      console.log('Unblock:', result);
      return result;
    } catch (error) {
      console.log(error, 'Unblock error');
    }
  }

  async function blockUser(user_id: string, blocked_user_id?: string) {
    console.log(user_id, blocked_user_id);
    try {
      const data = await fetch('http://localhost:5000/blacklist_add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          blocked_user_id: blocked_user_id,
        }),
      });
      const result = await data.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  function bubbleMenuOpen(state: boolean, setState: (arg0: boolean) => void) {
    setState(!state);
  }
  function changeTheme() {
    return theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  function changeModalView(
    actionType?: string,
    currentId?: string,
    currentId2?: string,
    currentName?: string
  ) {
    setIsModalOpen((prev) => ({
      open: !prev.open,
      type: actionType ?? prev.type,
      id: currentId ?? prev.id,
      name: currentName ?? prev.name,
      id_2: currentId2 ?? prev.id_2,
    }));
  }
  function filterUsers(e: { target: { value: React.SetStateAction<string> } }) {
    setFilter(e.target.value);
    return filter;
  }
  function openOptions() {
    setIsOpen(!isOpen);
  }

  const value: GlobalContextInterface = {
    theme,
    changeTheme,
    filterUsers,
    filter,
    setFilter,
    users,
    setUsers,
    openOptions,
    isOpen,
    isModalOpen,
    changeModalView,
    modalSettings,
    arrTest,
    setArrTest,
    bubbleMenuOpen,
    sidebarIsOpen,
    setSidebarIsOpen,
    addNewUsersOpen,
    setAddNewUsersOpen,
    searchUser,
    setSearchUser,
    user,
    setUser,
    currentUser,
    setCurrentUser,
    isOpenSettingsUser,
    setIsOpenSettingUser,
    isModalMessageOpen,
    setIsModalMessageOpen,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export function useGlobalContext(): GlobalContextInterface {
  return React.useContext(GlobalContext);
}

import React, { useState } from 'react';

type ModalKey = string;

interface ModalConfig {
  message: (arg0: string) => string;
  handlerCancel: () => void;
  handlerOk: (args0: number) => void;
}

interface GlobalContextInterface {
  theme: 'light' | 'dark';
  changeTheme: () => void;
  filterUsers: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  openOptions: () => void;
  isOpen: boolean;
  isModalOpen: ModalData;
  changeModalView: (
    actionType?: string,
    currentId?: string,
    currentName?: string
  ) => void;
  filteredUsers: User[];
  modalSettings: Record<ModalKey, ModalConfig>;

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
}

export const GlobalContext = React.createContext<GlobalContextInterface>(null!);

interface User {
  id: string;
  image?: string;
  name: string;
  online: boolean;
}
interface ModalData {
  open: boolean;
  type: string;
  id: string;
  name: string;
}

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');
  const [filter, setFilter] = React.useState('');
  const [users, setUsers] = React.useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);
  const [addNewUsersOpen, setAddNewUsersOpen] = React.useState(false);
  const [searchUser, setSearchUser] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState<ModalData>({
    open: false,
    type: '',
    id: '',
    name: '',
  });
  const [arrTest, setArrTest] = useState([1, 2, 3, 4, 5]);

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
      handlerOk: function (index: number) {
        const newList = [...arrTest];
        newList.splice(index, 1);
        setArrTest(newList);
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
        const currentId = isModalOpen.id;
        const newList = users.filter((user: User) => user.id !== currentId);
        setUsers(newList);
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
        const currentId = isModalOpen.id;
        const newList = users.filter((user: User) => user.id !== currentId);
        setUsers(newList);
        changeModalView();
      },
    },
  };

  function bubbleMenuOpen(state: boolean, setState: (arg0: boolean) => void) {
    setState(!state);
  }
  function changeTheme() {
    return theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  function changeModalView(
    actionType?: string,
    currentId?: string,
    currentName?: string
  ) {
    setIsModalOpen((prev) => ({
      open: !prev.open,
      type: actionType ?? prev.type,
      id: currentId ?? prev.id,
      name: currentName ?? prev.name,
    }));
  }
  function filterUsers(e: { target: { value: React.SetStateAction<string> } }) {
    setFilter(e.target.value);
    return setFilteredUsers(
      users.filter((user: User) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }
  function openOptions() {
    setIsOpen(!isOpen);
  }

  const value: GlobalContextInterface = {
    theme,
    changeTheme,
    filterUsers,
    filter,
    users,
    setUsers,
    openOptions,
    isOpen,
    isModalOpen,
    changeModalView,
    filteredUsers,
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
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export function useGlobalContext(): GlobalContextInterface {
  return React.useContext(GlobalContext);
}

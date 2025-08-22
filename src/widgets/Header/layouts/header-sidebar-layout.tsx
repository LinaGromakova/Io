'use client';
import React, {
  createContext,
  JSX,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { IoSearchOutline as SearchIcon } from 'react-icons/io5';
import clsx from 'clsx';

export const GlobalContext = React.createContext();

export function GlobalProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [addNewUsersOpen, setAddNewUsersOpen] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    type: '',
    id: '',
    name: '',
  });
  const [arrTest, setArrTest] = useState([1, 2, 3, 4, 5]);

  const modalSettings = {
    unLogin: {
      message: function (currentNameUser) {
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
      handlerOk: function (index) {
        const newList = [...arrTest];
        newList.splice(index, 1);
        setArrTest(newList);
        changeModalView();
      },
    },
    Block: {
      message: function () {
        return `Вы точно хотите заблокировать пользователя ${isModalOpen.name}?`;
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function (id) {
        const currentId = isModalOpen.id;
        const newList = users.filter((user) => user.id !== currentId);
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
        const newList = users.filter((user) => user.id !== currentId);
        setUsers(newList);
        changeModalView();
      },
    },
  };

  function bubbleMenuOpen(e, state, setState) {
    e.preventDefault();
    if (e.button === 2) {
      setState(!state);
    }
  }
  function changeTheme() {
    return theme === 'light' ? setTheme('dark') : setTheme('light');
  }
  function changeModalView(actionType, currentId, currentName) {
    setIsModalOpen((prev) => ({
      open: !prev.open,
      type: actionType,
      id: currentId,
      name: currentName,
    }));
  }
  function filterUsers(event) {
    setFilter(event.target.value);
    return setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }
  function openOptions() {
    setIsOpen(!isOpen);
  }
  return (
    <GlobalContext.Provider
      value={{
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function HeaderSidebarLayout(): JSX.Element {
  const {
    filterUsers,
    filter,
    openOptions,
    addNewUsersOpen,
    setAddNewUsersOpen,
    searchUser,
    setSearchUser,
  } = useContext(GlobalContext);

  const inputRef = useRef(null);
  useEffect(() => {
    if (addNewUsersOpen) {
      inputRef.current.focus();
    }
  }, [addNewUsersOpen]);
  return (
    <header className="flex  mb-4 w-full">
      {(addNewUsersOpen && (
        <LayoutButtonCircle
          type="BACK"
          className="mr-2 block min-w-9"
          handlerClick={() => {
            setAddNewUsersOpen(false);
            setSearchUser('');
          }}
        ></LayoutButtonCircle>
      )) || (
        <LayoutButtonCircle
          type="OPTIONS"
          className="mr-2 block min-w-9"
          handlerClick={() => openOptions()}
        ></LayoutButtonCircle>
      )}
      <div className="w-full relative flex items-center flex-row-reverse">
        <InputMain
          type="search"
          ref={inputRef}
          value={addNewUsersOpen ? searchUser : filter}
          purpose="FILTER"
          name="search"
          placeholder="Поиск"
          changeHandler={(e) => {
            addNewUsersOpen ? setSearchUser(e.target.value) : filterUsers(e);
          }}
          className={clsx(
            'w-full rounded-3xl max-sm:w-full block max-sm:max-w-none min-w-0 pl-12',
            addNewUsersOpen &&
              'input-active outline-2 outline-accent text-accent  duration-300'
          )}
        ></InputMain>
        <SearchIcon className="absolute text-2xl top-1.5 left-4 opacity-50 icon-focus duration-300"></SearchIcon>
      </div>
    </header>
  );
}

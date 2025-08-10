'use client';
import React, { createContext, JSX, useContext, useState } from 'react';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { IoSearchOutline as SearchIcon } from 'react-icons/io5';

export const GlobalContext = React.createContext();

export function GlobalProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    type: '',
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
      message: function (blockedName) {
        return `Вы точно хотите разблокировать пользователя ${blockedName}?`;
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
    deleteChat: {
      message: function (deleteNameChat) {
        return `Вы точно хотите удалить чат с ${deleteNameChat}?`;
      },
      handlerCancel: function () {
        changeModalView();
      },
      handlerOk: function (id) {
        const newList = [...users];
        newList.splice(id, 1);
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
  function changeModalView(actionType) {
    setIsModalOpen((prev) => ({
      open: !prev.open,
      type: actionType === 'unLogin' ? 'unLogin' : 'unBlock',
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function HeaderSidebarLayout(): JSX.Element {
  const { theme, changeTheme, filterUsers, filter, openOptions } =
    useContext(GlobalContext);

  return (
    <>
      <LayoutButtonCircle
        type="OPTIONS"
        className="mr-2 block min-w-9"
        handlerClick={() => openOptions()}
      ></LayoutButtonCircle>
      <div className="w-full relative flex flex-row-reverse">
        <InputMain
          type="search"
          value={filter}
          purpose="FILTER"
          name="search"
          placeholder="Поиск"
          changeHandler={(e) => filterUsers(e)}
          className="w-full rounded-3xl max-sm:w-full block max-sm:max-w-none min-w-0 pl-12"
        ></InputMain>
        <SearchIcon className="absolute text-2xl top-1.5 left-4 opacity-50 icon-focus duration-300"></SearchIcon>
      </div>
    </>
  );
}

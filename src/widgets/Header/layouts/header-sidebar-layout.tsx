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
  const [isOpen, setIsOpen] = useState(false);

  function changeTheme() {
    return theme === 'light' ? setTheme('dark') : setTheme('light');
  }
  function filterUsers(event) {
    setFilter(event.target.value.toLowerCase());
    return setUsers(
      users.filter((user) => user.name.toLowerCase().includes(filter))
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
      <div className="w-full relative">
        <SearchIcon className="absolute text-2xl top-1.5 left-4 opacity-50"></SearchIcon>
        <InputMain
          type="search"
          value={filter}
          purpose="MESSAGE"
          name="search"
          placeholder="Поиск"
          changeHandler={(e) => filterUsers(e)}
          className="w-full rounded-3xl max-sm:w-full block max-sm:max-w-none min-w-0 pl-12"
        ></InputMain>
      </div>
    </>
  );
}

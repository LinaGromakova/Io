'use client';
import React from 'react';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { IoSearchOutline as SearchIcon } from 'react-icons/io5';
import clsx from 'clsx';
import { useGlobalContext } from '@/features/common/globalContext';

export function HeaderSidebarLayout() {
  const {
    filterUsers,
    filter,
    openOptions,
    addNewUsersOpen,
    setAddNewUsersOpen,
    searchUser,
    setSearchUser,
  } = useGlobalContext();

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
          value={addNewUsersOpen ? searchUser : filter}
          purpose="FILTER"
          name="search"
          placeholder="Поиск"
          changeHandler={(e) =>
            addNewUsersOpen ? setSearchUser(e.target.value) : filterUsers(e)
          }
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
export { useGlobalContext };

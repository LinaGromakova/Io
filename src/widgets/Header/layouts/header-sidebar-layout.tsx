'use client';
import React from 'react';
import { IoSearchOutline as SearchIcon } from 'react-icons/io5';
import { useGlobalContext } from '@/features/common/globalContext';
import Logo from '../../../../public/logo/Logo.svg';
import { InputMain } from '@/shared/ui/InputMain';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';

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
    <header className="flex mb-4 w-full items-center">
      <Logo className="w-18 mr-2"></Logo>

      <div className="w-full relative flex items-center flex-row-reverse">
        <InputMain
          type="search"
          adding={addNewUsersOpen}
          value={addNewUsersOpen ? searchUser : filter}
          purpose="filter"
          name="search"
          placeholder="Поиск"
          changeHandler={(e) =>
            addNewUsersOpen ? setSearchUser(e.target.value) : filterUsers(e)
          }
        ></InputMain>
        <SearchIcon className="absolute text-2xl top-1.5 left-4 opacity-50 icon-focus duration-300"></SearchIcon>
      </div>
      {(addNewUsersOpen && (
        <ButtonCircle
          actionType="back"
          className="ml-2 block min-w-9"
          handlerClick={() => {
            setAddNewUsersOpen(false);
            setSearchUser('');
          }}
        ></ButtonCircle>
      )) || (
        <ButtonCircle
          actionType="options"
          className="ml-2 block min-w-9"
          handlerClick={() => openOptions()}
        ></ButtonCircle>
      )}
    </header>
  );
}
export { useGlobalContext };

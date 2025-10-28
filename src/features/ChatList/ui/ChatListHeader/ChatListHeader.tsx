'use client';
import React from 'react';
import Logo from '../../../../shared/assets/logo/Logo.svg';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import { ChatListInput } from './ChatListInput';
import { useSearchContext, useUiContext } from '@/features/common/contexts';

export function HeaderListLayout() {
  const { filter, searchUser, setSearchUser, filterUsers } = useSearchContext();
  const { isAddUserOpen, setIsAddUserOpen, setIsOptionsSidebarOpen } =
    useUiContext();
  return (
    <header className="flex mb-4 w-full items-center px-4 py-2 ">
      <Logo className="w-18 mr-2"></Logo>
      <ChatListInput
        isAdd={isAddUserOpen}
        filter={filter}
        search={searchUser}
        setSearch={setSearchUser}
        setFilter={filterUsers}
      ></ChatListInput>
      {(isAddUserOpen && (
        <ButtonCircle
          actionType="back"
          className="ml-2 block min-w-9"
          handlerClick={() => {
            setIsAddUserOpen(false);
            setSearchUser('');
          }}
        ></ButtonCircle>
      )) || (
        <ButtonCircle
          actionType="options"
          className="ml-2 block min-w-9"
          handlerClick={() => setIsOptionsSidebarOpen(true)}
        ></ButtonCircle>
      )}
    </header>
  );
}

'use client';
import React from 'react';
import Logo from '../../../../shared/assets/logo/Logo.svg';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import { ChatListInput } from './ChatListInput';
import { useAddUser, useOptions } from '@/features/interface-state/lib/hooks';
import { useSearchActions, useSearchState } from '@/features/search/lib/hooks';

export function HeaderListLayout() {
  const { isAddUserOpen, toggleAddUser } = useAddUser();
  const { toggleSidebarOptions } = useOptions();
  const { filter, searchUser } = useSearchState();

  const { setSearchUser, filterUsers } = useSearchActions();
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
            toggleAddUser();
            setSearchUser('');
          }}
        ></ButtonCircle>
      )) || (
        <ButtonCircle
          actionType="options"
          className="ml-2 block min-w-9"
          handlerClick={() => toggleSidebarOptions()}
        ></ButtonCircle>
      )}
    </header>
  );
}

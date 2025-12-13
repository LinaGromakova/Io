import { InputMain } from '@/shared/ui/InputMain';
import React from 'react';
import { SearchIcon } from '@/shared/assets/icons';

interface ChatListInputProps {
  isAdd: boolean;
  search: string;
  filter: string;
  setSearch: (value: string) => void;
  setFilter: (value: string) => void;
}

export function ChatListInput({
  isAdd,
  search,
  filter,
  setSearch,
  setFilter,
}: ChatListInputProps) {
  return (
    <div className="w-full relative flex items-center flex-row-reverse">
      <InputMain
        type="search"
        adding={isAdd}
        value={isAdd ? search : filter}
        purpose="filter"
        name="search"
        placeholder="Поиск"
        changeHandler={(e) =>
          isAdd ? setSearch(e.target.value) : setFilter(e.target.value)
        }
      ></InputMain>
      <SearchIcon className="absolute text-2xl top-1.5 left-4 opacity-50 icon-focus duration-300"></SearchIcon>
    </div>
  );
}

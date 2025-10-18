import { InputMain } from '@/shared/ui/InputMain';
import React, { SetStateAction } from 'react';
import { IoSearchOutline as SearchIcon } from 'react-icons/io5';

interface ChatListInputProps {
  isAdd: boolean;
  search: string;
  filter: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
  setFilter: (e: { target: { value: React.SetStateAction<string> } }) => void;
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
          isAdd ? setSearch(e.target.value) : setFilter(e)
        }
      ></InputMain>
      <SearchIcon className="absolute text-2xl top-1.5 left-4 opacity-50 icon-focus duration-300"></SearchIcon>
    </div>
  );
}

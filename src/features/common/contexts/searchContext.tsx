'use client';
import React from 'react';

interface SearchContextInterface {
  filter: string;
  searchUser: string;
  setSearchUser: React.Dispatch<React.SetStateAction<string>>;
  filterUsers: (e: { target: { value: React.SetStateAction<string> } }) => void;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchContext = React.createContext<SearchContextInterface>(null!);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchUser, setSearchUser] = React.useState('');
  const [filter, setFilter] = React.useState('');
  function filterUsers(e: { target: { value: React.SetStateAction<string> } }) {
    setFilter(e.target.value);
  }

  const value = { filter, searchUser, setSearchUser, filterUsers, setFilter };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearchContext(): SearchContextInterface {
  return React.useContext(SearchContext);
}

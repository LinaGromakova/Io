'use client';

import React, { createContext, JSX, useContext, useState } from 'react';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';

export const ThemeContext = React.createContext('');

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('LIGHT');

  function changeTheme() {
    return theme === 'LIGHT' ? setTheme('DARK') : setTheme('LIGHT');
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function HeaderSidebarLayout(): JSX.Element {
  const { theme, changeTheme } = useContext(ThemeContext);
  console.log(theme);
  return (
    <>
      <LayoutButtonCircle
        type={theme}
        className="mr-2 block min-w-9"
        handlerClick={() => changeTheme()}
      ></LayoutButtonCircle>
      <InputMain
        type="search"
        purpose="MESSAGE"
        name="search"
        placeholder="Search..."
        className="rounded-3xl w-full max-sm:w-full block max-sm:max-w-none min-w-0"
      ></InputMain>
      <LayoutButtonCircle
        type="SEARCH"
        className="ml-2 block min-w-9"
      ></LayoutButtonCircle>
    </>
  );
}

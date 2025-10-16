import React from 'react';

type ModalMessageTypeState = {
  message: string;
  open: boolean;
};
interface UiContextInterface {
  isOptionsSidebarOpen: boolean;
  isUserSettingsOpen: boolean;
  isAddUserOpen: boolean;
  isModalMessageOpen: { message: string; open: boolean };
  isSidebarOpen: boolean;
  toggleOptionsSidebar: () => void;
  toggleBubbleMenu: (state: boolean, setState: (arg0: boolean) => void) => void;
  setIsUserSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalMessageOpen: React.Dispatch<
    React.SetStateAction<ModalMessageTypeState>
  >;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UiContext = React.createContext<UiContextInterface>(null!);

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [isOptionsSidebarOpen, setIsOptionsSidebarOpen] = React.useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = React.useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isModalMessageOpen, setIsModalMessageOpen] = React.useState({
    message: '',
    open: false,
  });

  function toggleOptionsSidebar() {
    setIsOptionsSidebarOpen(!isOptionsSidebarOpen);
  }
  function toggleBubbleMenu(state: boolean, setState: (arg0: boolean) => void) {
    setState(!state);
  }

  const value = {
    isOptionsSidebarOpen,
    isUserSettingsOpen,
    isAddUserOpen,
    isModalMessageOpen,
    isSidebarOpen,
    toggleOptionsSidebar,
    toggleBubbleMenu,
    setIsUserSettingsOpen,
    setIsAddUserOpen,
    setIsModalMessageOpen,
    setIsSidebarOpen,
  };
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUiContext(): UiContextInterface {
  return React.useContext(UiContext);
}

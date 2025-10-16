import React from 'react';

type CurrentUserInterface = {
  id: string;
  name: string;
  login: string;
  image: string;
  online: boolean;
};
interface ChatContextInterface {
  currentUser: CurrentUserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserInterface>>;
  isBlock: boolean;
  setIsBlock: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ChatContext = React.createContext<ChatContextInterface>(null!);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = React.useState<CurrentUserInterface>({
    id: '',
    name: '',
    login: '',
    image: '',
    online: false,
  });

  const [isBlock, setIsBlock] = React.useState(false);

  const value = { currentUser, setCurrentUser, isBlock, setIsBlock };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatContextInterface {
  return React.useContext(ChatContext);
}


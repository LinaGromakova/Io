import { useEffect, useState } from 'react';
import { UserContact } from '../UserContact/user-contact';
import { UserContactSimpleLayout } from '../UserContact/layouts/user-contact-simple';
import { useGlobalContext } from '@/features/common/globalContext';

function debounce<T extends (...args: unknown[]) => Promise<void>>(
  func: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), ms);
  };
}
async function getUsers(search: boolean, searchValue: string) {
  if (search) {
    const data = await fetch(`http://localhost:5000/search/${searchValue}`);
    const users = await data.json();
    return users;
  } else return [];
}

async function getChats(user_id: string) {
  const response = await fetch(`http://localhost:5000/${user_id}`);
  const chats = await response.json();
  return chats;
}
interface UserInterface {
  id: string;
  name: string;
  login: string;
  image: string;
  online: boolean;
  last_seen: string;
  created_at: string;
  chat_id: string;
}
interface ChatInterface {
  chat_id: string;
  user_id: string;
  name: string;
  image: string;
  online: boolean;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export function UserContactListLayout() {
  const {
    users,
    setUsers,
    addNewUsersOpen,
    setAddNewUsersOpen,
    searchUser,
    user,
    isModalOpen,
    filter,
  } = useGlobalContext();
  const [chats, setChats] = useState([]);

  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      const users = await getUsers(addNewUsersOpen, searchUser);
      setUsers(users);
    }, 250);

    debouncedFetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewUsersOpen, searchUser]);

  useEffect(() => {
    getChats(user.id).then((chats) => {
      console.log(chats);
      setChats(chats);
    });
  }, [addNewUsersOpen, isModalOpen]);

  useEffect(() => {
    setFilteredChats(
      chats.filter((chat: ChatInterface) =>
        chat.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter]);
  return (
    <>
      {addNewUsersOpen && searchUser === '' ? (
        <div className="flex flex-col items-center justify-center h-9/12 text-base">
          <p className="mb-4 opacity-65">Введите имя пользователя</p>
        </div>
      ) : null}

      {addNewUsersOpen && users.length !== 0 && searchUser !== ''
        ? users.map((u) => (
            <UserContactSimpleLayout
              key={u.id}
              {...u}
              id_1={user.id}
              id_2={u.id}
              newCompanion={{ ...u }}
              type="writeUser"
            />
          ))
        : addNewUsersOpen &&
          searchUser !== '' && (
            <div className="flex flex-col items-center justify-center h-9/12 text-base">
              <p className="mb-4 opacity-65">Пользователь не найден</p>
            </div>
          )}

      {!addNewUsersOpen && chats.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-9/12 text-base">
          <p className="mb-4 opacity-65">Сейчас у Вас нет активных чатов.</p>
          <p
            className="opacity-65 hover:opacity-100 hover:underline cursor-pointer"
            onClick={() => setAddNewUsersOpen(true)}
          >
            Добавить собеседника
          </p>
        </div>
      ) : !addNewUsersOpen && filter && filteredChats.length > 0 ? (
        filteredChats.map((user: UserInterface) => (
          <UserContact
            newCompanion={{ ...user }}
            key={user.id}
            user_id={user.id}
            {...user}
            type="USER_CONTACT"
          />
        ))
      ) : !addNewUsersOpen && filter && filteredChats.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-9/12 text-base">
          <p className="mb-4 opacity-65">Пользователь не найден</p>
        </div>
      ) : !addNewUsersOpen ? (
        chats.map((chat: ChatInterface) => (
          <UserContact
            id={undefined}
            key={chat.chat_id}
            {...chat}
            newCompanion={{ ...chat, id: chat.chat_id }}
            type="USER_CONTACT"
          />
        ))
      ) : null}
    </>
  );
}

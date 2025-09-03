import { useEffect, useState } from 'react';
import { UserContact } from '../UserContact/user-contact';
import { UserContactSimpleLayout } from '../UserContact/layouts/user-contact-simple';
import { useGlobalContext } from '@/features/common/globalContext';

function debounce(func: Promise<void>, ms: number | undefined) {
  let timeout: string | number | NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
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

// interface Users {
//   id: string;
//   image?: string;
//   name: string;
//   online: boolean;
// }
export function UserContactListLayout() {
  const {
    users,
    setUsers,
    filteredUsers,
    filter,
    addNewUsersOpen,
    setAddNewUsersOpen,
    searchUser,
    user,
    isModalOpen,
  } = useGlobalContext();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    debounce(
      getUsers(addNewUsersOpen, searchUser).then((users) => {
        return setUsers(users);
      }),
      250
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewUsersOpen, searchUser]);

  useEffect(() => {
    getChats(user.id).then((chats) => {
      setChats(chats);
    });
  }, [addNewUsersOpen, isModalOpen]);
  // console.log(user);

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
      ) : !addNewUsersOpen && filter && filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <UserContact
            newCompanion={{ ...user }}
            key={user.id}
            {...user}
            type="USER_CONTACT"
          />
        ))
      ) : !addNewUsersOpen && filter && filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-9/12 text-base">
          <p className="mb-4 opacity-65">Пользователь не найден</p>
        </div>
      ) : !addNewUsersOpen ? (
        chats.map((chat) => (
          <UserContact
            key={chat.chat_id}
            {...chat}
            newCompanion={{ ...chat }}
            type="USER_CONTACT"
          />
        ))
      ) : null}
    </>
  );
}

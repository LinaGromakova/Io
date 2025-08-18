import { JSX, useContext } from 'react';
import { useEffect } from 'react';
import { UserContact } from '../UserContact/user-contact';
import { GlobalContext } from '@/widgets/Header/layouts/header-sidebar-layout';

async function getUsers() {
  const data = await fetch('http://localhost:5000');

  const users = await data.json();

  return users;
}
interface Users {
  id: number;
  image?: string;
  name: string;
  online: boolean;
  lastMessage: string;
  lastAtCreate: string;
  read: boolean;
  countMessage: number;
}

const usersGlobal = [
  { id: 1, image: null, name: 'Nevan', online: 'true' },
  {
    id: 2,
    image:
      'https://preview.redd.it/how-powerful-is-vergil-really-v0-awihm1nphzjd1.jpeg?width=640&crop=smart&auto=webp&s=9c1d50f553c8931f97cb9621bc27baf2235d809d',
    name: 'Vergil',
    online: 'false',
  },
  {
    id: 3,
    image: 'https://gamebomb.ru/files/galleries/001/3/3d/154945.jpg',
    name: 'Nero',
    online: 'true',
  },
];
export function UserContactListLayout(): JSX.Element {
  const {
    users,
    setUsers,
    filteredUsers,
    filter,
    addNewUsersOpen,
    setAddNewUsersOpen,
    searchUser,
  } = useContext(GlobalContext);
  useEffect(() => {
    getUsers().then((users) => {
      return setUsers(users);
    });
  }, []);
  const usersGlobalSearch = usersGlobal.filter((user) =>
    user.name.toLowerCase().includes(searchUser.toLowerCase())
  );
  return (
    <>
      {addNewUsersOpen && usersGlobalSearch.length !== 0
        ? usersGlobalSearch.map((user) => (
            <UserContact key={user.id} {...user} type="USER_CONTACT" />
          ))
        : addNewUsersOpen && (
            <div className="flex flex-col items-center justify-center h-9/12 text-base">
              <p className="mb-4 opacity-65">Пользователь не найден</p>
            </div>
          )}

      {!addNewUsersOpen && users.length === 0 ? (
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
          <UserContact key={user.id} {...user} type="USER_CONTACT" />
        ))
      ) : !addNewUsersOpen && filter && filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-9/12 text-base">
          <p className="mb-4 opacity-65">Пользователь не найден</p>
        </div>
      ) : !addNewUsersOpen ? (
        users.map((user) => (
          <UserContact key={user.id} {...user} type="USER_CONTACT" />
        ))
      ) : null}
    </>
  );
}

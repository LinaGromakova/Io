import { JSX, useContext } from 'react';
import { useEffect, useState } from 'react';
import { UserContact } from '../UserContact/user-contact';
import { GlobalContext } from '@/widgets/Header/layouts/header-sidebar-layout';
async function getUsers() {
  const data = await fetch('http://localhost:5000');

  const users = await data.json();
  // const users = [];
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
export function UserContactListLayout(): JSX.Element {
  const { users, setUsers } = useContext(GlobalContext);
  useEffect(() => {
    getUsers().then((users) => {
      return setUsers(users);
    });
  }, []);
  return (
    <>
      {(users.length === 0 && (
        <div className="flex flex-col items-center justify-center h-9/12 text-base">
          <p className="mb-4 opacity-65">Сейчас у Вас нет активных чатов.</p>
          <p className="opacity-65 hover:opacity-100 hover:underline cursor-pointer">
            Добавить собеседника
          </p>
        </div>
      )) ||
        users.map((user: Users) => {
          return (
            <UserContact
              key={user.id}
              {...user}
              type="USER_CONTACT"
            ></UserContact>
          );
        })}
    </>
  );
}

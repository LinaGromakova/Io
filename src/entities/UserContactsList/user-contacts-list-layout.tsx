import { JSX } from 'react';
import { useEffect, useState } from 'react';
import { UserContact } from '../UserContact/user-contact';
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
export function UserContactListLayout(): JSX.Element {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((users) => {
      return setUsers(users);
    });
  }, []);
  return (
    <>
      {users.map((user: Users) => {
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

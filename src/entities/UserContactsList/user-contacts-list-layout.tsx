import { JSX } from 'react';
import { UserContact } from '../UserContact/user-contact';

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
const users: Users[] = [
  {
    id: 1,
    image: 'https://i.redd.it/h2yzonu2q9wc1.jpeg',
    name: 'Aaa',
    online: true,
    lastMessage: 'string',
    lastAtCreate: '17:00',
    read: false,
    countMessage: 3,
  },
  {
    id: 2,
    name: 'Ddd',
    online: true,
    lastMessage: 'string',
    lastAtCreate: '17:00',
    read: true,
    countMessage: 0,
  },
  {
    id: 3,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzdWHcffKPDbUMWEVLor3x7sknODQ7SP-Qmw&s',
    name: 'string',
    online: true,
    lastMessage: 'string',
    lastAtCreate: '17:00',
    read: false,
    countMessage: 8,
  },
  {
    id: 4,
    name: 'ccc',
    online: true,
    lastMessage: 'string',
    lastAtCreate: '17:30',
    read: true,
    countMessage: 0,
  },
];
export function UserContactListLayout(): JSX.Element {
  return (
    <>
      {users.map((user) => {
        return <UserContact key={user.id} {...user} type='USER_CONTACT'></UserContact>;
      })}
    </>
  );
}

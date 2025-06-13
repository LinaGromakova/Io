import { UserContact } from '@/entities/UserContact/user-contact';
import { JSX } from 'react';

export function HeaderMainLayout(): JSX.Element {
  return (
    <UserContact
      image='https://i.redd.it/h2yzonu2q9wc1.jpeg'
      name='Aaa'
      online={true}
      lastMessage='string'
      lastAtCreate='17:00'
      read={false}
      countMessage={3}
      type='CURRENT_CONTACT'
    ></UserContact>
  );
}

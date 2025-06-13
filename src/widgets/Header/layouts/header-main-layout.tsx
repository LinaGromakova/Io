import { UserContactLayout } from '@/entities/UserContact/user-contact-layout';
import { JSX } from 'react';

export function HeaderMainLayout(): JSX.Element {
  return (
    <UserContactLayout
      image='https://i.redd.it/h2yzonu2q9wc1.jpeg'
      name='Aaa'
      online={true}
      lastMessage='string'
      lastAtCreate='17:00'
      read={false}
      countMessage={3}
      typeLayout='CURRENT_CONTACT'
    ></UserContactLayout>
  );
}

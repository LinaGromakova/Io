import { JSX } from 'react';
import { UserContactCurrentLayout } from './layouts/user-contact-layout';
import { UserContactLayout } from './layouts/user-contact-current-layout';
import { UserContactProps } from './interfaces/layout-props';

export function UserContact(props: UserContactProps): JSX.Element {
  const { type }: 'USER_CONTACT' | 'CURRENT_CONTACT' = props;
  return (
    <>
      {(type === 'USER_CONTACT' && <UserContactLayout {...props}></UserContactLayout>) || (
        <UserContactCurrentLayout {...props}></UserContactCurrentLayout>
      )}
    </>
  );
}

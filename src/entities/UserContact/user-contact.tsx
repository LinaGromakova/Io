import { JSX } from 'react';
import { UserContactLayout } from './layouts/user-contact-layout';
import { UserContactCurrentLayout } from './layouts/user-contact-current-layout';
import { UserContactProps } from './interfaces/layout-props';


export function UserContact(props: UserContactProps): JSX.Element {
  const { type } = props;
  return (
    <>
      <div>
        {(type === 'USER_CONTACT' && (
          <div className="relative">
            <UserContactLayout {...props}></UserContactLayout>
          </div>
        )) || <UserContactCurrentLayout {...props}></UserContactCurrentLayout>}
      </div>
    </>
  );
}

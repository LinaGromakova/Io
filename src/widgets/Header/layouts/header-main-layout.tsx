import { UserContact } from '@/entities/UserContact/user-contact';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { JSX } from 'react';

export function HeaderMainLayout(state, setState): JSX.Element {
  return (
    <>
      <LayoutButtonCircle
        type="BACK"
        className="mr-4 hidden max-sm:flex"
        handlerClick={(state, setState) => setState(!state)}
      ></LayoutButtonCircle>
      <UserContact
        image=""
        name="Aaa"
        online={true}
        lastMessage="string"
        lastAtCreate="17:00"
        read={false}
        countMessage={3}
        type="CURRENT_CONTACT"
      ></UserContact>
    </>
  );
}

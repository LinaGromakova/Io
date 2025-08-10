import { JSX, useContext, useState } from 'react';
import { UserContactLayout } from './layouts/user-contact-layout';
import { UserContactCurrentLayout } from './layouts/user-contact-current-layout';
import { UserContactProps } from './interfaces/layout-props';

import { BubbleMenuLayout } from '../Bubble-menu-list/bubble-menu-layout';
import { GlobalContext } from '@/widgets/Header/layouts/header-sidebar-layout';
import { ConfirmModalLayout } from '@/shared/Confirm-modal/confirm-modal-layout';

export function UserContact(props: UserContactProps): JSX.Element {
  const { bubbleMenuOpen, isModalOpen, modalSettings } =
    useContext(GlobalContext);
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const { type } = props;

  return (
    <>
      <div
        onContextMenu={(e) => {
          bubbleMenuOpen(e, isBubbleMenuOpen, setIsBubbleMenuOpen);
        }}
      >
        {(type === 'USER_CONTACT' && (
          <div className="relative">
            {isBubbleMenuOpen && <BubbleMenuLayout></BubbleMenuLayout>}
            <UserContactLayout {...props}></UserContactLayout>
          </div>
        )) || <UserContactCurrentLayout {...props}></UserContactCurrentLayout>}
      </div>
      {isModalOpen && (
        <ConfirmModalLayout
          {...modalSettings}
          message={modalSettings[isModalOpen.type]?.message('dante')}
        ></ConfirmModalLayout>
      )}
    </>
  );
}

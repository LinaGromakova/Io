import { BubbleMenuLayout } from '@/entities/Bubble-menu-list/bubble-menu-layout';
import { UserContact } from '@/entities/UserContact/user-contact';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGlobalContext } from './header-sidebar-layout';
import { useRouter } from 'next/router';

// interface Users {
//   id: number;
//   image?: string;
//   name: string;
//   online: boolean;
//   lastMessage: string;
//   lastAtCreate: string;
//   read: boolean;
//   countMessage: number;
// }

async function getCurrentUser(chat_id: string, user_id: string) {
  try {
    const data = await fetch(
      `http://localhost:5000/${chat_id}/user/${user_id}`
    );
    const user = await data.json();
    return user;
  } catch (error) {
    console.log(error, 'Error');
  }
}

export function HeaderMainLayout() {
  const { setSidebarIsOpen, currentUser, setCurrentUser, user } = useGlobalContext();
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const router = useRouter();
  const chat_id = router.query.id;
  useEffect(() => {
    getCurrentUser(chat_id, user.id).then((user) => {
      return setCurrentUser(user);
    });
  }, [chat_id]);

  return (
    <>
      <Link href="/">
        <LayoutButtonCircle
          type="BACK"
          className="mr-4 hidden max-sm:flex"
          handlerClick={() => setSidebarIsOpen(true)}
        ></LayoutButtonCircle>
      </Link>
      <UserContact
        newCompanion={{ ...currentUser }}
        name={currentUser?.name}
        online={currentUser?.online}
        type="CURRENT_CONTACT"
        image={currentUser?.image}
        id={currentUser?.id}
      ></UserContact>
      <LayoutButtonCircle
        type="MORE"
        className="ml-auto"
        handlerClick={() => setIsBubbleMenuOpen(true)}
      ></LayoutButtonCircle>
      <BubbleMenuLayout
        id={typeof user.id === 'string' ? user.id : ''}
        name={typeof currentUser?.name === 'string' ? currentUser?.name : ''}
        current_id={currentUser?.id}
        visible={isBubbleMenuOpen}
        setVisible={setIsBubbleMenuOpen}
        className="top-18 right-5"
        type="currentUser"
        newCompanion={{ ...currentUser }}
      ></BubbleMenuLayout>
    </>
  );
}

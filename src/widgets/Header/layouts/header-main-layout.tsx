import { BubbleMenuLayout } from '@/entities/Bubble-menu-list/bubble-menu-layout';
import { UserContact } from '@/entities/UserContact/user-contact';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from './header-sidebar-layout';

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

async function getUsers(id: string | string[]) {
  try {
    const data = await fetch(`http://localhost:5000/${id}`);
    const user = await data.json();
    return user;
  } catch {
    console.log('ops');
  }
}

export function HeaderMainLayout() {
  const { setSidebarIsOpen } = useGlobalContext();
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [current, setCurrent] = useState({
    id: '',
    name: '',
    image: '',
    online: false,
  });

  useEffect(() => {
    if (id) {
      getUsers(id).then((user) => {
        return setCurrent(user);
      });
    }
  }, [id]);
  console.log(current);

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
        newCompanion={{ ...current }}
        name=""
        online={false}
        type="CURRENT_CONTACT"
        id={id}
      ></UserContact>
      <LayoutButtonCircle
        type="MORE"
        className="ml-auto"
        handlerClick={() => setIsBubbleMenuOpen(true)}
      ></LayoutButtonCircle>
      <BubbleMenuLayout
        id={id}
        visible={isBubbleMenuOpen}
        setVisible={setIsBubbleMenuOpen}
        className="top-18 right-5"
        type="currentUser"
        newCompanion={{ ...current }}
      ></BubbleMenuLayout>
    </>
  );
}

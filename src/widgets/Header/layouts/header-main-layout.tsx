import { BubbleMenuLayout } from '@/entities/Bubble-menu-list/bubble-menu-layout';
import { UserContact } from '@/entities/UserContact/user-contact';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import Link from 'next/link';
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

async function getCurrentUser(user_id: string) {
  try {
    
    const data = await fetch(`http://localhost:5000/user/${user_id}`);
    const user = await data.json();

    return user;
  } catch {
    console.log('ops');
  }
}

export function HeaderMainLayout() {
  const { setSidebarIsOpen, currentUser } = useGlobalContext();
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const [current, setCurrent] = useState({});

  useEffect(() => {
    if (currentUser) {
      getCurrentUser(currentUser).then((user) => {
        return setCurrent(user);
      });
    }
  }, []);
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
        name={current.name}
        online={false}
        type="CURRENT_CONTACT"
        id={'QbyXWBF0CrAxoTjBDL4LO'}
      ></UserContact>
      <LayoutButtonCircle
        type="MORE"
        className="ml-auto"
        handlerClick={() => setIsBubbleMenuOpen(true)}
      ></LayoutButtonCircle>
      <BubbleMenuLayout
        id={
          typeof 'QbyXWBF0CrAxoTjBDL4LO' === 'string'
            ? 'QbyXWBF0CrAxoTjBDL4LO'
            : ''
        }
        name={typeof current?.name === 'string' ? current?.name : ''}
        visible={isBubbleMenuOpen}
        setVisible={setIsBubbleMenuOpen}
        className="top-18 right-5"
        type="currentUser"
        newCompanion={{ ...current }}
      ></BubbleMenuLayout>
    </>
  );
}

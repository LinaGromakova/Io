import { BubbleMenuLayout } from '@/entities/Bubble-menu-list/bubble-menu-layout';
import { UserContact } from '@/entities/UserContact/user-contact';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { JSX, useContext, useEffect, useState } from 'react';
import { GlobalContext } from './header-sidebar-layout';

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
// const users: Users[] = [
//   {
//     id: 1,
//     image: 'https://i.redd.it/h2yzonu2q9wc1.jpeg',
//     name: 'Aaa',
//     online: true,
//     lastMessage: 'string',
//     lastAtCreate: '17:00',
//     read: false,
//     countMessage: 3,
//   },
//   {
//     id: 2,
//     name: 'Ddd',
//     online: true,
//     lastMessage: 'string',
//     lastAtCreate: '17:00',
//     read: true,
//     countMessage: 0,
//   },
//   {
//     id: 3,
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzdWHcffKPDbUMWEVLor3x7sknODQ7SP-Qmw&s',
//     name: 'string',
//     online: true,
//     lastMessage: 'string',
//     lastAtCreate: '17:00',
//     read: false,
//     countMessage: 8,
//   },
//   {
//     id: 42,
//     name: 'ccc',
//     online: true,
//     lastMessage: 'string',
//     lastAtCreate: '17:30',
//     read: true,
//     countMessage: 0,
//   },
//   {
//     id: 45,
//     name: 'ccc',
//     online: true,
//     lastMessage:
//       'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe tempore hic natus, possimus nisi porro doloremque est officia eos error praesentium veritatis ab quisquam labore voluptatum vitae repellat. Fugiat, aliquam!',
//     lastAtCreate: '17:30',
//     read: true,
//     countMessage: 0,
//   },
// ];
async function getUsers(id) {
  try {
    const data = await fetch(`http://localhost:5000/${id}`);
    const user = await data.json();
    return user;
  } catch {
    console.log('ops');
  }
}

export function HeaderMainLayout(): JSX.Element {
  const [current, setCurrent] = useState({});
  const { setSidebarIsOpen } = useContext(GlobalContext);
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getUsers(id).then((user) => {
      return setCurrent(user);
    });
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
      <UserContact {...current} type="CURRENT_CONTACT"></UserContact>
      <LayoutButtonCircle
        type="MORE"
        className="ml-auto"
        handlerClick={() => setIsBubbleMenuOpen(true)}
      ></LayoutButtonCircle>
      <BubbleMenuLayout
        id={id}
        name={current?.name}
        visible={isBubbleMenuOpen}
        setVisible={setIsBubbleMenuOpen}
        className="top-18 right-5"
        type="currentUser"
      ></BubbleMenuLayout>
    </>
  );
}

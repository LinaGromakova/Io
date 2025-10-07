import { BubbleMenuLayout } from '@/entities/Bubble-menu-list/bubble-menu-layout';
import { UserContact } from '@/entities/UserContact/user-contact';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGlobalContext } from './header-sidebar-layout';
import { useRouter } from 'next/router';
import { socket } from '@/features/common/globalContext';

async function getCurrentUser(chat_id: string, user_id: string) {
  try {
    const data = await fetch(
      `http://localhost:5000/${chat_id}/user/${user_id}`
    );
    const user = await data.json();
    console.log(user);
    return user;
  } catch (error) {
    console.log(error, 'Error');
  }
}
export function HeaderMainLayout() {
  const { setSidebarIsOpen, currentUser, setCurrentUser, user } =
    useGlobalContext();
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);

  const router = useRouter();

  const chat_id = String(router.query.id);

  useEffect(() => {
    if (router.isReady) {
      getCurrentUser(chat_id, user.id).then((user) => {
        return setCurrentUser(user);
      });
    }
  }, [chat_id]);

  useEffect(() => {
    socket.on('update-online', (data) => {
      setCurrentUser((user) => {
        return data.user_id === user.id
          ? { ...user, online: data.online }
          : user;
      });
    });
    return () => {
      socket.off('update-online');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('update-image', (data) => {
      setCurrentUser((user) => {
        return data.id === user.id ? { ...user, image: data.image } : user;
      });
    });
    return () => {
      socket.off('update-image');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('update-name', (data) => {
      setCurrentUser((user) => {
        return data.id === user.id ? { ...user, name: data.name } : user;
      });
    });
    return () => {
      socket.off('update-name');
    };
  }, [socket]);

  return (
    <>
      <Link href="/">
        <LayoutButtonCircle
          type="BACK"
          className="mr-4 hidden max-md:flex"
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
        user_id=""
        chat_id=""
        lastCreate={''}
      ></UserContact>
      <LayoutButtonCircle
        type="MORE"
        className="ml-auto"
        handlerClick={() => setIsBubbleMenuOpen(true)}
      ></LayoutButtonCircle>

      <BubbleMenuLayout
        id={typeof user.id === 'string' ? user.id : ''}
        name={typeof currentUser?.name === 'string' ? currentUser?.name : ''}
        current_id={currentUser.id}
        visible={isBubbleMenuOpen}
        setVisible={setIsBubbleMenuOpen}
        className="top-18 right-5"
        type="currentUser"
        newCompanion={{ ...currentUser }}
        chat_id={chat_id}
        id_1=""
        id_2=""
      ></BubbleMenuLayout>
    </>
  );
}

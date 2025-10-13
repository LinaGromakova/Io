import { UserContact } from '@/entities/UserContact/ui/UserContact';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGlobalContext } from './header-sidebar-layout';
import { useRouter } from 'next/router';
import { socket } from '@/features/common/globalContext';
import { ButtonCircle } from '@/shared/ui/ButtonCircle';
import { BubbleMenu } from '@/entities/BubbleMenu';

export function HeaderMainLayout() {
  const {
    setSidebarIsOpen,
    currentUser,
    setCurrentUser,
    user,
    changeModalView,
  } = useGlobalContext();
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);

  const router = useRouter();

  const chat_id = String(router.query.id);

  async function getCurrentUser(chat_id: string, user_id: string) {
    try {
      const data = await fetch(
        `http://localhost:5000/${chat_id}/user/${user_id}`
      );
      const user = await data.json();
      if (!user) {
        router.replace('/404');
        return null;
      }
      console.log(user);
      return user;
    } catch (error) {
      router.replace('/404');
      console.log(error, 'Error');
      return null;
    }
  }

  useEffect(() => {
    if (router.isReady) {
      getCurrentUser(chat_id, user.id).then((user) => {
        if (!user) return;

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
        <ButtonCircle
          actionType="back"
          className="mr-4 hidden max-md:flex"
          handlerClick={() => setSidebarIsOpen(true)}
        ></ButtonCircle>
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
      <ButtonCircle
        actionType="more"
        className="ml-auto"
        handlerClick={() => setIsBubbleMenuOpen(true)}
      ></ButtonCircle>
      <BubbleMenu
        menuType={'contactHeader'}
        visible={isBubbleMenuOpen}
        setVisible={setIsBubbleMenuOpen}
        isBlock={false}
        onClick={(actionType) => {
          console.log(actionType);
          // changeModalView('action', {});
        }}
        className="top-18 right-5"
      ></BubbleMenu>
      {/* <BubbleMenuLayout
        id={typeof user.id === 'string' ? user.id : ''}
        name={typeof currentUser?.name === 'string' ? currentUser?.name : ''}
        current_id={currentUser.id}
        visible={isBubbleMenuOpen}
        setVisible={}
        className="top-18 right-5"
        type="currentUser"
        newCompanion={{ ...currentUser }}
        chat_id={chat_id}
        id_1=""
        id_2=""
      ></BubbleMenuLayout> */}
    </>
  );
}
// if (item.actionType === 'block') {
//                       changeModalView(
//                         item.actionType,
//                         props.id,
//                         props.current_id,
//                         props.name
//                       );
//                     } else {
//                       changeModalView(
//                         item.actionType,
//                         props.chat_id,
//                         undefined,
//                         props.name
//                       );
//                     }

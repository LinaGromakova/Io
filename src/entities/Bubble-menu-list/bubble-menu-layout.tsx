import { BubbleMenuItem } from '@/shared/Bubble-menu-item/bubble-menu-item';
import { IoLockOpenOutline as LockOpenIcon } from 'react-icons/io5';
import React, { useEffect } from 'react';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import { MdBlockFlipped as BlockIcon } from 'react-icons/md';
import { IoMdCreate as WriteIcon } from 'react-icons/io';
import clsx from 'clsx';
import { useGlobalContext } from '@/features/common/globalContext';
import { useRouter } from 'next/navigation';

const chatUsersConfig = [
  {
    icon: <DeleteIcon className="text-lg"></DeleteIcon>,
    text: 'Удалить чат',
  },
];
const currentUserConfig = [
  {
    icon: <BlockIcon className="text-lg"></BlockIcon>,
    text: 'Заблокировать',
    actionType: 'block',
  },

  {
    icon: <DeleteIcon className="text-lg"></DeleteIcon>,
    text: 'Удалить чат',
    actionType: 'deleteChat',
  },
];
interface User {
  id: string;
  image?: string;
  name: string;
  online: boolean;
}

interface propsBubbleMenuLayout {
  id_1: string;
  id_2: string;
  type: string;
  id: string;
  name: string;
  visible: boolean;
  className?: string;
  setVisible: (arg0: boolean) => void;
  newCompanion: User;
  chat_id: string;
  current_id?: string;
}

export function BubbleMenuLayout(props: propsBubbleMenuLayout) {
  const menuRef = React.useRef<HTMLUListElement>(null);
  const { changeModalView, setAddNewUsersOpen, setSearchUser } =
    useGlobalContext();
  const router = useRouter();

  async function writeUser(id_1: string, id_2: string) {
    console.log(id_1, id_2);
    try {
      const data = await fetch('http://localhost:5000/start-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1_id: id_1, user2_id: id_2 }),
      });
      const result = await data.json();
      router.push(`/${result.id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      const targetElement = e.target as HTMLElement;
      if (menuRef.current && !menuRef.current.contains(targetElement)) {
        props.setVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props]);
  const lockIcon = <LockOpenIcon className="text-lg"></LockOpenIcon>;
  const writeIcon = <WriteIcon className="text-lg"></WriteIcon>;

  return (
    <>
      {props.visible && (
        <ul
          className={clsx(
            'list-none absolute bg-inter z-50 shadow-md rounded-md',
            props?.className
          )}
          ref={menuRef}
        >
          {(props.type === 'userChat' &&
            chatUsersConfig.map((item, index) => {
              return (
                <BubbleMenuItem
                  {...item}
                  key={index}
                  onClick={() => {
                    console.log();
                    changeModalView(
                      'deleteChat',
                      props.chat_id,
                      undefined,
                      props.name
                    );
                  }}
                ></BubbleMenuItem>
              );
            })) ||
            (props.type === 'unBlock' && (
              <BubbleMenuItem
                text="Разблокировать"
                icon={lockIcon}
                onClick={() =>
                  changeModalView(
                    'unBlock',
                    props.id,
                    props.current_id,
                    props.name
                  )
                }
              ></BubbleMenuItem>
            )) ||
            (props.type === 'currentUser' &&
              currentUserConfig.map((item, index) => {
                return (
                  <BubbleMenuItem
                    {...item}
                    key={index}
                    onClick={() => {
                      if (item.actionType === 'block') {
                        changeModalView(
                          item.actionType,
                          props.id,
                          props.current_id,
                          props.name
                        );
                      } else {
                        changeModalView(
                          item.actionType,
                          props.chat_id,
                          undefined,
                          props.name
                        );
                      }
                    }}
                  ></BubbleMenuItem>
                );
              })) ||
            (props.type === 'writeUser' && (
              <BubbleMenuItem
                text="Написать"
                icon={writeIcon}
                onClick={() => {
                  writeUser(props.id_1, props.id_2);
                  setSearchUser('');
                  setAddNewUsersOpen(false);
                }}
              ></BubbleMenuItem>
            ))}
        </ul>
      )}
    </>
  );
}

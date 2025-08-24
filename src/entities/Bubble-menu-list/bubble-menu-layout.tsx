import { BubbleMenuItem } from '@/shared/Bubble-menu-item/bubble-menu-item';
import { IoLockOpenOutline as LockOpenIcon } from 'react-icons/io5';
import React, { useEffect } from 'react';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import { MdBlockFlipped as BlockIcon } from 'react-icons/md';
import { IoMdCreate as WriteIcon } from 'react-icons/io';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/features/common/globalContext';

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
  id?: string | undefined;
  image?: string;
  name: string;
  online: boolean;
}

interface propsBubbleMenuLayout {
  type: string;
  id: string | undefined;
  name: string;
  visible: boolean;
  className?: string;
  setVisible: (arg0: boolean) => void;
  newCompanion: User;
}

export function BubbleMenuLayout(props: propsBubbleMenuLayout) {
  const menuRef = React.useRef<HTMLUListElement>(null);
  const router = useRouter();
  const { changeModalView, users, setUsers, setAddNewUsersOpen } =
    useGlobalContext();

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
                  onClick={() =>
                    changeModalView('deleteChat', props.id, props.name)
                  }
                ></BubbleMenuItem>
              );
            })) ||
            (props.type === 'unBlock' && (
              <BubbleMenuItem
                text="Разблокировать"
                icon={lockIcon}
                onClick={() => changeModalView('unBlock', props.id, props.name)}
              ></BubbleMenuItem>
            )) ||
            (props.type === 'currentUser' &&
              currentUserConfig.map((item, index) => {
                return (
                  <BubbleMenuItem
                    {...item}
                    key={index}
                    onClick={() =>
                      changeModalView(item.actionType, props.id, props.name)
                    }
                  ></BubbleMenuItem>
                );
              })) ||
            (props.type === 'writeUser' && (
              <BubbleMenuItem
                text="Написать"
                icon={writeIcon}
                onClick={() => {
                  if (users.find((user: User) => user.id === props.id)) {
                    router.replace(`/${props.id}`);
                  } else {
                    setUsers([...users, props.newCompanion]);
                    router.replace(`/${props.id}`);
                  }
                  setAddNewUsersOpen(false);
                }}
              ></BubbleMenuItem>
            ))}
        </ul>
      )}
    </>
  );
}

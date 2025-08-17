import { BubbleMenuItem } from '@/shared/Bubble-menu-item/bubble-menu-item';
import { GlobalContext } from '@/widgets/Header/layouts/header-sidebar-layout';
import { IoLockOpenOutline as LockOpenIcon } from 'react-icons/io5';
import { useContext, useEffect, useRef } from 'react';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import { MdBlockFlipped as BlockIcon } from 'react-icons/md';
import clsx from 'clsx';

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
    actionType: 'Block',
  },

  {
    icon: <DeleteIcon className="text-lg"></DeleteIcon>,
    text: 'Удалить чат',
    actionType: 'deleteChat',
  },
];

export function BubbleMenuLayout(props) {
  const menuRef = useRef(null);
  const { changeModalView } = useContext(GlobalContext);
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        props.setVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props]);
  const lockIcon = <LockOpenIcon className="text-lg"></LockOpenIcon>;
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
              }))}
        </ul>
      )}
    </>
  );
}

import { BubbleMenuItem } from '@/shared/Bubble-menu-item/bubble-menu-item';
import { GlobalContext } from '@/widgets/Header/layouts/header-sidebar-layout';
import { IoLockOpenOutline as LockOpenIcon } from 'react-icons/io5';
import { useContext, useEffect, useRef } from 'react';
import { MdDelete as DeleteIcon } from 'react-icons/md';
const chatUsersConfig = [
  {
    icon: <DeleteIcon className="text-lg"></DeleteIcon>,
    text: 'Удалить чат',
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
  return (
    <>
      {props.visible && (
        <ul
          className="list-none absolute top-10 right-15 bg-inter z-50 shadow-md rounded-md"
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
                onClick={() => changeModalView('unBlock', props.id, props.name)}
              >
                <LockOpenIcon className="text-lg"></LockOpenIcon>
              </BubbleMenuItem>
            ))}
        </ul>
      )}
    </>
  );
}

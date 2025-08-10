import { BubbleMenuItem } from '@/shared/Bubble-menu-item/bubble-menu-item';

import { MdDelete as DeleteIcon } from 'react-icons/md';

const configItemChat = [
  {
    icon: <DeleteIcon className="text-lg"></DeleteIcon>,
    text: 'Удалить чат',
    className: 'text-red-600',
    // onClick: function (id, chats) {},
  },
];

export function BubbleMenuLayout() {

  return (
    <ul className="list-none absolute top-10 right-5 bg-inter z-50 shadow-md rounded-md">
      {configItemChat.map((item, index) => {
        return (
          <BubbleMenuItem
            {...item}
            key={index}
          ></BubbleMenuItem>
        );
      })}
    </ul>
  );
}

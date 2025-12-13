import {
  BlockIcon,
  CreateIcon as WriteIcon,
  DeleteIcon,
  LockOpenIcon,
} from '@/shared/assets/icons';

export const BubbleMenuConfig = {
  contactHeader: {
    normal: [
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
    ],
    blocked: [
      {
        icon: <LockOpenIcon className="text-lg"></LockOpenIcon>,
        text: 'Разблокировать',
        actionType: 'unBlock',
      },

      {
        icon: <DeleteIcon className="text-lg"></DeleteIcon>,
        text: 'Удалить чат',
        actionType: 'deleteChat',
      },
    ],
  },
  contactDetails: [
    {
      icon: <DeleteIcon className="text-lg"></DeleteIcon>,
      text: 'Удалить чат',
      actionType: 'deleteChat',
    },
  ],
  contactSimpleWrite: [
    {
      icon: <WriteIcon className="text-lg"></WriteIcon>,
      text: 'Написать',
      actionType: 'writeUser',
    },
  ],
  contactSimpleInBlock: [
    {
      icon: <LockOpenIcon className="text-lg"></LockOpenIcon>,
      text: 'Разблокировать',
      actionType: 'unBlock',
    },
  ],
};

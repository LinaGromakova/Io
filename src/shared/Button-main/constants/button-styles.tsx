import { IoMdCreate as CreateIcon } from 'react-icons/io';
import { CiLogin as LoginIcon } from 'react-icons/ci';
import { IoMdImages as ImagesIcon } from 'react-icons/io';
import { JSX } from 'react';

interface ButtonStylesOfType {
  [type: string]: {
    style: string;
    icon: JSX.Element | null;
  };
}
const iconStyles: string = 'text-xl mr-1';
export const ButtonMainStyles: ButtonStylesOfType = {
  back: {
    style: `bg-gradient-to-r from-red-800 via-accent-shadow to-accent w-full`,
    icon: null,
  },
  login: {
    style: `bg-gradient-to-r from-red-800 via-accent-shadow to-accent w-full`,
    icon: <LoginIcon className={iconStyles}></LoginIcon>,
  },
  register: {
    style: 'bg-gradient-to-l  from-accent-shadow to-accent w-full',
    icon: <CreateIcon className={iconStyles}></CreateIcon>,
  },
  ok: {
    style: 'bg-gradient-to-l  from-accent-shadow to-accent',
    icon: null,
  },
  cancel: {
    style: 'bg-gradient-to-r from-red-800 via-accent-shadow to-accent',

    icon: null,
  },
  'apply photo': {
    style: 'bg-gradient-to-r from-red-800 via-accent-shadow to-accent w-full',

    icon: <ImagesIcon className={iconStyles}></ImagesIcon>,
  },
};

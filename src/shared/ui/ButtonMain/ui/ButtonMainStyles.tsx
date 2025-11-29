import { JSX } from 'react';
import {
  CreateIcon,
  ImagesIcon,
  LogIcon as LoginIcon,
} from '@/shared/assets/icons';

type ButtonStylesOfType = {
  [type: string]: {
    style: string;
    icon?: JSX.Element;
  };
};

const iconStyles: string = 'text-xl mr-1';

export const ButtonMainStyles = `cursor-pointer font-medium  text-white
  px-4 py-2 h-9 rounded-sm  capitalize
  hover:scale-105 duration-300 focus:outline-0 
  mt-6 mb-2 flex items-center justify-center
  disabled:bg-gradient-to-r disabled:from-extra disabled:via-extra disabled:to-extra 
  disabled:opacity-75 disabled:hover:scale-100 disabled:cursor-auto`;

export const ButtonMainStylesByActionTypes: ButtonStylesOfType = {
  back: {
    style: `bg-gradient-to-r from-red-800 via-accent-shadow to-accent w-full`,
    icon: undefined,
  },
  login: {
    style: `bg-gradient-to-r from-red-800 via-accent-shadow to-accent w-full`,
    icon: <LoginIcon className={iconStyles}></LoginIcon>,
  },
  register: {
    style: 'bg-gradient-to-l from-accent-shadow to-accent w-full',
    icon: <CreateIcon className={iconStyles}></CreateIcon>,
  },
  ok: {
    style: 'bg-gradient-to-l from-accent-shadow to-accent',
    icon: undefined,
  },
  cancel: {
    style: 'bg-gradient-to-r from-red-800 via-accent-shadow to-accent',
    icon: undefined,
  },
  applyPhoto: {
    style: 'bg-gradient-to-r from-red-800 via-accent-shadow to-accent w-full',
    icon: <ImagesIcon className={iconStyles}></ImagesIcon>,
  },
};

import { IoMdCreate as CreateIcon } from 'react-icons/io';
import { CiLogin as LoginIcon } from 'react-icons/ci';
import { JSX } from 'react';

interface ButtonStylesOfType {
  [type: string]: {
    style: string;
    icon: JSX.Element;
  };
}
const iconStyles: string = 'text-xl mr-1';
export const ButtonMainStyles: ButtonStylesOfType = {
  login: {
    style: `bg-gradient-to-r from-red-800 via-accent-shadow to-accent`,
    icon: <LoginIcon className={iconStyles}></LoginIcon>,
  },
  register: {
    style: 'bg-gradient-to-l  from-accent-shadow to-accent',
    icon: <CreateIcon className={iconStyles}></CreateIcon>,
  },
};

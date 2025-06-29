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
  'log in': {
    style: 'bg-gradient-to-r from-red-800 via-accent-shadow to-accent  ',
    icon: <LoginIcon className={iconStyles}></LoginIcon>,
  },
  registration: {
    style: 'bg-accent-shadow',
    icon: <CreateIcon className={iconStyles}></CreateIcon>,
  },
  submit: {
    style: 'bg-gradient-to-l  from-accent-shadow to-accent ',
    icon: <></>,
  },
};

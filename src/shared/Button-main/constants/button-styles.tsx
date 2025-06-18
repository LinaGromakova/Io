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
    style: 'interactive-el  ',
    icon: <LoginIcon className={iconStyles}></LoginIcon>,
  },
  registration: {
    style: 'bg-foreground color-interface hover:bg-foreground/80',
    icon: <CreateIcon className={iconStyles}></CreateIcon>,
  },
  submit: {
    style: 'interactive-el ',
    icon: <></>,
  },
};

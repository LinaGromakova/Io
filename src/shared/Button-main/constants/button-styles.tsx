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
    style: 'bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400 focus:bg-slate-800',
    icon: <LoginIcon className={iconStyles}></LoginIcon>,
  },
  registration: {
    style: 'bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400/65 focus:bg-amber-600',
    icon: <CreateIcon className={iconStyles}></CreateIcon>,
  },
  submit: {
    style: 'bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400 focus:bg-slate-800',
    icon: <></>,
  },
};

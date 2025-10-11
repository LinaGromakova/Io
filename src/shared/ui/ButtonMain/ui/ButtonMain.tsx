import clsx from 'clsx';
import React from 'react';
import {
  ButtonMainStyles,
  ButtonMainStylesByActionTypes,
} from './ButtonMainStyles';

type ButtonMainProps = {
  actionType: 'login' | 'register' | 'ok' | 'cancel' | 'applyPhoto' | 'back';
  type: 'submit' | 'reset' | 'button';
  text: string;
  className?: string;
  handlerClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
};

export function ButtonMain(props: ButtonMainProps) {
  const { style, icon } = ButtonMainStylesByActionTypes[props.actionType];

  return (
    <button
      type={props.type}
      onClick={(e) => props.handlerClick(e)}
      disabled={props?.disabled}
      className={clsx(ButtonMainStyles, style, props.className)}
    >
      {icon}
      <span>{props.text}</span>
    </button>
  );
}

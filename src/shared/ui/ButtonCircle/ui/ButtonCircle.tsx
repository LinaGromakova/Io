import React, { JSX } from 'react';
import clsx from 'clsx';
import { ButtonCircleIcons } from './ButtonCircleIcons';
import {
  ButtonCircleStylesBasic,
  ButtonCircleStylesByTypes,
} from './ButtonCircleStyles';

type ButtonProps = {
  actionType:
    | 'message'
    | 'create'
    | 'back'
    | 'options'
    | 'photoAdd'
    | 'more';
  children?: React.ReactNode;
  handlerClick: () => void;
  className?: string;
};

export function ButtonCircle(props: ButtonProps) {
  const Icon: JSX.Element = ButtonCircleIcons[props.actionType];
  const styleType = ButtonCircleStylesByTypes[props.actionType];

  return (
    <button
      type="button"
      className={clsx(ButtonCircleStylesBasic, styleType, props.className)}
      onClick={() => props.handlerClick()}
    >
      {Icon}
      {props.children}
    </button>
  );
}

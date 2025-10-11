import React from 'react';
import clsx from 'clsx';

type BubbleMenuItemProps = {
  className?: string;
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
};

export function BubbleMenuItem(props: BubbleMenuItemProps) {
  return (
    <li
      className={clsx(
        `px-4 py-1.5 text-md border-b border-b-foreground/10 bg-background hover:bg-background/50
         shadow-md duration-300 select-none cursor-pointer rounded-sm flex items-center`,
        props?.className
      )}
      onClick={() => props.onClick()}
    >
      {props.icon}
      <span className="ml-2">{props.text}</span>
    </li>
  );
}

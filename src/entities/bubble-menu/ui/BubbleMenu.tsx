import React, { useEffect } from 'react';
import clsx from 'clsx';
import { BubbleMenuItem } from '@/shared/ui/BubbleMenuItem';
import { BubbleMenuConfig } from '../config/bubble-menu-config';

interface BubbleMenuProps {
  menuType:
    | 'contactHeader'
    | 'contactDetails'
    | 'contactSimpleWrite'
    | 'contactSimpleInBlock';
  className?: string;
  visible: boolean;
  setVisible: (arg0: boolean) => void;
  isBlock?: boolean;
  onClick: (actionType: string) => void;
}
export function BubbleMenu(props: BubbleMenuProps) {
  const menuRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      const targetElement = e.target as HTMLElement;
      if (menuRef.current && !menuRef.current.contains(targetElement)) {
        props.setVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props]);
  const menuVariant = props.isBlock ? 'blocked' : 'normal';
  const optionMenu =
    props.menuType === 'contactHeader'
      ? BubbleMenuConfig.contactHeader[menuVariant]
      : BubbleMenuConfig[props.menuType];

  return (
    <>
      {props.visible && (
        <ul
          className={clsx(
            'list-none absolute bg-inter z-50 shadow-md rounded-md',
            props?.className
          )}
          ref={menuRef}
        >
          {optionMenu.map((option, index: number) => {
            return (
              <BubbleMenuItem
                key={index}
                {...option}
                onClick={() => {
                  props.onClick(option.actionType);
                }}
              ></BubbleMenuItem>
            );
          })}
        </ul>
      )}
    </>
  );
}

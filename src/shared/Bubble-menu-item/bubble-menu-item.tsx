import { GlobalContext } from '@/widgets/Header/layouts/header-sidebar-layout';
import clsx from 'clsx';
import { useContext } from 'react';

export function BubbleMenuItem(props) {
  const { changeModalView } = useContext(GlobalContext);
  return (
    <li
      className={clsx(
        'px-2 py-1 text-sm  duration-300 select-none cursor-pointer rounded-sm flex items-center hover:bg-foreground/5',
        props?.className
      )}
      onClick={() => changeModalView('deleteChat')}
    >
      {props.icon}
      <span className="ml-2">{props.text}</span>
    </li>
  );
}

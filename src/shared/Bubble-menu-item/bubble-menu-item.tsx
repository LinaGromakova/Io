import clsx from 'clsx';

export function BubbleMenuItem(props) {
  return (
    <li
      className={clsx(
        'px-4 py-1.5 text-md border-b-[1px] border-b-foreground/10 text-foreground duration-300 select-none cursor-pointer rounded-sm flex items-center hover:bg-foreground/5',
        props?.className
      )}
      onClick={() => props.onClick()}
    >
      {props.icon}
      <span className="ml-2">{props.text}</span>
    </li>
  );
}

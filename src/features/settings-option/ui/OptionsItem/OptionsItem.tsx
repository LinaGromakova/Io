import { JSX } from 'react';

interface OptionsItemProps {
  icon?: JSX.Element;
  text: string;
  handlerClick: () => void;
}
export function OptionsItem({ icon, text, handlerClick }: OptionsItemProps) {
  return (
    <div
      className="py-4 px-5 relative flex items-center rounded-2xl duration-300 transition-colors
               hover:bg-inter cursor-pointer"
      onClick={() => handlerClick()}
    >
      {icon}
      <p className="ml-4 capitalize">{text}</p>
    </div>
  );
}

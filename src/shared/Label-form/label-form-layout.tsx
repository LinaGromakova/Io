import { JSX } from 'react';

interface LabelProps {
  children: JSX.Element;
  text: string;
}

export function LabelForm(props: LabelProps) {
  return (
    <label className="text-sm block h-[95px]">
      <p className="opacity-80 ">{props.text}</p>
      <div className="relative w-full"> {props.children}</div>
    </label>
  );
}

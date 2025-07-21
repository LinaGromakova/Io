import { JSX } from 'react';

interface LabelProps {
  children: JSX.Element;
  text: string;
}

export function LabelForm(props: LabelProps) {
  return (
    <label className=" text-sm mb-4 block h-[90px]">
      <p className="opacity-75">{props.text}</p>
      {props.children}
    </label>
  );
}

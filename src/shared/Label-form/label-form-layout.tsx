import { JSX } from 'react';

interface LabelProps {
  children: JSX.Element;
  text: string;
}

export function LabelForm(props: LabelProps) {
  return (
    <label className='text-white/75 text-sm mb-4 block capitalize'>
      <p>{props.text}</p>
      {props.children}
    </label>
  );
}

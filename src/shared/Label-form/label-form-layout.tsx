import { JSX } from 'react';

interface LabelProps {
  children: JSX.Element;
  text: string;
}

export function LabelForm(props: LabelProps) {
  return (
    <label className=' text-sm mb-6 block capitalize'>
      <p className='opacity-75'>{props.text}</p>
      {props.children}
    </label>
  );
}

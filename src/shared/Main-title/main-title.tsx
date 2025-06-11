import { JSX } from 'react';
interface TitleProps {
  title: string;
}
export function MainTitle(props: TitleProps): JSX.Element {
  return (
    <h1 className='text-white text-5xl font-normal tracking-[2px] text-center mb-8 capitalize'>
      {props.title}
    </h1>
  );
}

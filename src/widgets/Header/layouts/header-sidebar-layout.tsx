import { JSX } from 'react';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';

export function HeaderSidebarLayout(): JSX.Element {
  return (
    <>
      <InputMain
        type='search'
        purpose='MESSAGE'
        name='search'
        placeholder='Search...'
        className='rounded-3xl w-full max-sm:w-full block max-sm:max-w-none min-w-0'
      ></InputMain>
      <LayoutButtonCircle type='SEARCH' className='ml-2 block min-w-9'></LayoutButtonCircle>
    </>
  );
}

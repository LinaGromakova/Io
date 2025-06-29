'use client';
import { JSX } from 'react';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
export function ChatInput(): JSX.Element {
  return (
    <form
      action='#'
      onSubmit={(e) => e.preventDefault()}
      className='flex w-full bottom-0 sticky px-5 justify-center py-5'
    >
      <InputMain
        type='text'
        purpose='MESSAGE'
        placeholder='Message'
        name='chat'
        className='mr-2 w-3/5 rounded-2xl'
      ></InputMain>
      <LayoutButtonCircle type='MESSAGE'></LayoutButtonCircle>
    </form>
  );
}

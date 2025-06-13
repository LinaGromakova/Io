import { JSX } from 'react';
import { InputMain } from '@/shared/Input-main/layout-input-main';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import { UserContactLayout } from '@/entities/UserContact/user-contact-layout';
export function Header(props): JSX.Element {
  return (
    <header className='flex items-center py-2 px-4 max-h-fit w-full bg-slate-800'>
      {(props.type === 'SIDEBAR' && (
        <>
          <InputMain
            type='search'
            purpose='MESSAGE'
            name='search'
            className='rounded-3xl flex-9/12'
          ></InputMain>
          <LayoutButtonCircle type='SEARCH' className='ml-2'></LayoutButtonCircle>
        </>
      )) || (
        <UserContactLayout
          image='https://i.redd.it/h2yzonu2q9wc1.jpeg'
          name='Aaa'
          online={true}
          lastMessage='string'
          lastAtCreate='17:00'
          read={false}
          countMessage={3}
          typeLayout='CURRENT_CONTACT'
        ></UserContactLayout>
      )}
    </header>
  );
}

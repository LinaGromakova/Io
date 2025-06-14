import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/widgets/Header/header';
export const metadata: Metadata = {
  title: 'Io',
  description: 'lroem',
};

import { SidebarContactsLayout } from '@/widgets/SidebarContacts/sidebar-contacts-layout';
import { UserMessage } from '@/entities/UserMessage/user-message';
import { ChatInput } from '@/features/ChatInput/ChatInput';
import clsx from 'clsx';
// {
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>
const scroll: string = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-slate-800
  hover:[&::-webkit-scrollbar-thumb]:bg-slate-400
  [&::-webkit-scrollbar-thumb]:rounded-full`;
export default function RootLayout() {
  return (
    <html lang='en'>
      <body className=' bg-slate-900 flex overflow-y-hidden'>
        <SidebarContactsLayout></SidebarContactsLayout>

        <div className='w-full'>
          <Header type='HEADER_MAIN'></Header>
          <div>
            <div
              className={clsx(
                'py-5 px-12 w-full h-[85vh] overflow-y-scroll relative pb-15',
                scroll
              )}
            >
              <div>
                <UserMessage
                  message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ex quibusdam fuga cupiditate ab quasi consequatur labore, magni, accusamus repudiandae, non deserunt provident exercitationem laborum veniam optio sed? Unde, rerum.'
                  atPush='17:10'
                  read={true}
                  sender='ANOTHER'
                ></UserMessage>
                <UserMessage
                  message='Lorem ipsum .'
                  atPush='17:10'
                  read={true}
                  sender='ANOTHER'
                ></UserMessage>
              </div>
              <div>
                <UserMessage
                  message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ex quibusdam fuga cupiditate ab quasi '
                  atPush='22:10'
                  read={false}
                  sender='YOU'
                ></UserMessage>

                <UserMessage
                  message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ex quibusdam fuga cupiditate ab quasi '
                  atPush='22:10'
                  read={false}
                  sender='YOU'
                ></UserMessage>

                <UserMessage
                  message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ex quibusdam fuga cupiditate ab quasi '
                  atPush='22:10'
                  read={false}
                  sender='YOU'
                ></UserMessage>

                <UserMessage
                  message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ex quibusdam fuga cupiditate ab quasi '
                  atPush='22:10'
                  read={false}
                  sender='YOU'
                ></UserMessage>
              </div>
            </div>
            <ChatInput></ChatInput>
          </div>
        </div>
      </body>
    </html>
  );
}

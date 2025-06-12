import type { Metadata } from 'next';
import './globals.css';
import { ButtonMain } from '@/shared/Button-main/button-main-layout';
export const metadata: Metadata = {
  title: 'Io',
  description: 'lroem',
};

import clsx from 'clsx';
import { UserContactListLayout } from '@/entities/UserContactsList/user-contacts-list-layout';
// {
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>
const scroll: string = ` [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-slate-800
  hover:[&::-webkit-scrollbar-thumb]:bg-slate-400
  [&::-webkit-scrollbar-thumb]:rounded-full`;

export default function RootLayout() {
  return (
    <html lang='en'>
      <body className=' bg-slate-900'>
        <div className={clsx(' w-2/5 bg-slate-800 overflow-y-scroll h-screen', scroll)}>
          <UserContactListLayout></UserContactListLayout>
        </div>
      </body>
    </html>
  );
}

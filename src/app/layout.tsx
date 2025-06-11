import type { Metadata } from 'next';
import './globals.css';
import { ButtonMain } from '@/shared/Button-main/button-main-layout';
export const metadata: Metadata = {
  title: 'Io',
  description: 'lroem',
};
import { FormAuth } from '@/entities/FormAuth/form-auth-layout';
// {
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>
export default function RootLayout() {
  return (
    <html lang='en'>
      <body className=' bg-slate-900'>
        <FormAuth></FormAuth>
      </body>
    </html>
  );
}

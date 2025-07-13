import type { Metadata } from 'next';
import './globals.css';
import MyApp from '@/pages/_app';

export const metadata: Metadata = {
  title: 'Io',
  description: 'lroem',
};

export default function RootLayout() {
  <MyApp></MyApp>;
}

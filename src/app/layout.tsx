import type { Metadata } from 'next';
import { Geist, Inter, Space_Grotesk } from 'next/font/google';

import { cn } from '@/lib/utils';

import { Providers } from './providers';

import './globals.css';
import './tailwind.config.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const fontInter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const fontSpaceGrotesk = Space_Grotesk({
  variable: '--font-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Unified admin panel for ChatChat, ChatAndBuild, and Living Brain.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-sans', geist.variable)}>
      <body className={`${fontInter.variable} ${fontSpaceGrotesk.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

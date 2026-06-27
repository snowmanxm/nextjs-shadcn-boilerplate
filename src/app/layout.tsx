import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

import './globals.css';
import './tailwind.config.css';

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
    <html lang="en">
      <body className={`${fontInter.variable} ${fontSpaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

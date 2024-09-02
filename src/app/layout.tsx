import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Web3Provider } from '@/components/provider/Web3Provider';
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'sonner';

import '@radix-ui/themes/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lens SDK Example',
  description: 'Connect wallet and explore profiles',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <Theme>{children}</Theme>
        </Web3Provider>
        <Toaster />
      </body>
    </html>
  );
}

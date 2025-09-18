import Footer from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const iconsSocialMedia15Colr = localFont({
  src: './fonts/Icons Social Media 15-COLR.ttf',
  variable: '--iconsSocialMedia15Colr',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NextCart',
  description: 'Next.js e-commerce exercise',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} ${iconsSocialMedia15Colr.variable} antialiased
          min-h-svh content-grid grid-rows-[auto_1fr_auto]
        `}
      >
        <Header />
        {children}
        <Footer />
        {modal}
      </body>
    </html>
  );
}

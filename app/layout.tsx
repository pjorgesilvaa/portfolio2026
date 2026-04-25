import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Paulo Silva',
  description: 'Personal portfolio website for Paulo Silva, showcasing projects and experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='scroll-smooth'>
      <GoogleAnalytics gaId="G-ZYPKYJVTQQ" />
      <GoogleTagManager gtmId="GTM-NSX6S6VJ" />
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { headers } from 'next/headers';
import { LOCALE_TO_LANG_ATTR } from '@/lib/language';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Paulo Silva',
    template: '%s | Paulo Silva',
  },
  description: 'Senior Full Stack Engineer specialising in scalable systems, clean architecture, and cloud-native technologies.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const locale = (h.get('x-locale') ?? 'en') as keyof typeof LOCALE_TO_LANG_ATTR;
  const lang = LOCALE_TO_LANG_ATTR[locale] ?? 'en-US';

  return (
    <html lang={lang} className="scroll-smooth scroll-pt-21">
      <GoogleAnalytics gaId="G-ZYPKYJVTQQ" />
      <GoogleTagManager gtmId="GTM-NSX6S6VJ" />
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

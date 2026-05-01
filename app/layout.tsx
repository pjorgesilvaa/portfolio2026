import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { headers } from 'next/headers';
import { LOCALE_TO_LANG_ATTR } from '@/lib/language';
import Script from 'next/script';
import ClarityIdentify from '@/components/clarityIdentify';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://paulosilva.com';

export const metadata: Metadata = {
  title: {
    default: 'Paulo Silva',
    template: '%s | Paulo Silva',
  },
  description: 'Senior Full Stack Engineer specialising in scalable systems, clean architecture, and cloud-native technologies.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    siteName: 'Paulo Silva',
    title: 'Paulo Silva',
    description: 'Senior Full Stack Engineer specialising in scalable systems, clean architecture, and cloud-native technologies.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Paulo Silva — Senior Full Stack Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Silva',
    description: 'Senior Full Stack Engineer specialising in scalable systems, clean architecture, and cloud-native technologies.',
    images: ['/images/og-image.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const locale = (h.get('x-locale') ?? 'en') as keyof typeof LOCALE_TO_LANG_ATTR;
  const lang = LOCALE_TO_LANG_ATTR[locale] ?? 'en-US';

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Paulo Silva',
    url: BASE_URL,
    jobTitle: 'Senior Full Stack Engineer',
    description: 'Senior Full Stack Engineer specialising in scalable systems, clean architecture, and cloud-native technologies.',
    image: `${BASE_URL}/images/hero-image.png`,
    sameAs: [
      'https://github.com/pjorgesilvaa',
      'https://www.linkedin.com/in/paulo-silva171',
    ],
  };

  return (
    <html lang={lang} className="scroll-smooth scroll-pt-21">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <GoogleAnalytics gaId="G-ZYPKYJVTQQ" />
      <GoogleTagManager gtmId="GTM-NSX6S6VJ" />
      {process.env.NEXT_PUBLIC_CLARITY_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
        </Script>
      )}
      <body className={`${inter.variable} antialiased`}>
        {process.env.NEXT_PUBLIC_CLARITY_ID && <ClarityIdentify />}
        {children}
      </body>
    </html>
  );
}

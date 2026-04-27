import { notFound } from 'next/navigation';
import { LOCALES } from '@/lib/language';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://paulosilva.com';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'en-US':    `${BASE_URL}/en`,
        'pt-PT':    `${BASE_URL}/pt`,
        'x-default': `${BASE_URL}/en`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Guard: reject unknown locale segments (returns 404)
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) {
    notFound();
  }

  return <>{children}</>;
}

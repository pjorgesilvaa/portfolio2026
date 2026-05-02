import Link from 'next/link';
import { getLocale } from '@/lib/language.server';

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <h1 className="text-[10rem] font-bold text-primary leading-none select-none">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-[#2B3437] mt-2">
        {locale === 'pt' ? 'Página não encontrada' : 'Page not found'}
      </h2>
      <p className="text-secondary mt-3 max-w-sm text-sm md:text-base">
        {locale === 'pt'
          ? 'A página que procura não existe ou foi movida.'
          : "The page you're looking for doesn't exist or has been moved."}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {locale === 'pt' ? 'Voltar ao início' : 'Back to home'}
      </Link>
    </div>
  );
}

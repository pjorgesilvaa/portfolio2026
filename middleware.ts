import { NextRequest, NextResponse } from 'next/server';

export const LOCALES = ['en', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

function getPreferredLocale(request: NextRequest): Locale {
  // Read Accept-Language header — works for both browsers and crawlers
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  if (/\bpt\b/i.test(acceptLanguage)) return 'pt';
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Detect locale already present in path
  const pathnameLocale = LOCALES.find(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameLocale) {
    // Already localized — pass through, but stamp x-locale on the request
    // so server components can read it via headers()
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', pathnameLocale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // No locale in path → redirect to preferred locale
  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals, static assets, and files with extensions
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|images|.*\\..*).*)'],
};

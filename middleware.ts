import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Lista delle lingue supportate
  locales,
  
  // Lingua di default
  defaultLocale,
  
  // Strategia per rilevare la lingua preferita
  localeDetection: true,
  
  // Usa sempre il prefixo nella URL (es: /it/, /en/)
  localePrefix: 'always'
});

export const config = {
  // Applica il middleware a tutte le route eccetto quelle specificate
  matcher: ['/', '/(it|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};

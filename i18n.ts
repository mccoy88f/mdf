import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Lingue supportate
export const locales = ['en', 'it'] as const;
export type Locale = (typeof locales)[number];

// Lingua di default
export const defaultLocale: Locale = 'it';

export default getRequestConfig(async ({ locale }) => {
  // Valida che la lingua sia supportata
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

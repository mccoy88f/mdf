'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === 'it' ? 'en' : 'it';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLocale}
      className="gap-2"
    >
      <span className="text-lg">{locale === 'it' ? '🇮🇹' : '🇬🇧'}</span>
      <span>{locale === 'it' ? 'IT' : 'EN'}</span>
    </Button>
  );
}

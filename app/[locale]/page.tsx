import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from '@/components/Link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Language Switcher */}
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('features.nextjs.title')}</CardTitle>
              <CardDescription>
                {t('features.nextjs.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Framework React moderno con routing automatico e performance ottimali.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('features.database.title')}</CardTitle>
              <CardDescription>
                {t('features.database.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Prisma genera automaticamente query type-safe e gestisce migrazioni.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('features.ui.title')}</CardTitle>
              <CardDescription>
                {t('features.ui.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                UI components bellissimi basati su Radix UI e Tailwind CSS.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg">
            {t('buttons.start')}
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/mccoy88f/mdf" target="_blank" rel="noopener noreferrer">
              {t('buttons.docs')}
            </a>
          </Button>
        </div>

        {/* Info Box */}
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="text-lg">{t('info.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <strong>{t('info.prismaStudio')}:</strong>{" "}
              {t.rich('info.prismaStudioDesc', {
                link: (chunks) => (
                  <a href="http://localhost:5555" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    http://localhost:5555
                  </a>
                )
              })}
            </p>
            <p className="text-sm">
              <strong>{t('info.database')}:</strong> {t('info.databaseDesc')}
            </p>
            <p className="text-sm">
              <strong>{t('info.hotReload')}:</strong> {t('info.hotReloadDesc')}
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground space-y-2 pt-8 border-t">
          <p>
            {t('footer.poweredBy')}{" "}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Next.js
            </a>
            {", "}
            <a href="https://www.prisma.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Prisma
            </a>
            {" & "}
            <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Shadcn/UI
            </a>
          </p>
          <p>
            <a href="https://github.com/mccoy88f/mdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              {t('footer.source')}
            </a>
          </p>
          <p>
            {t.rich('footer.credits', {
              author: (chunks) => (
                <a href="https://github.com/mccoy88f" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                  @mccoy88f
                </a>
              )
            })}
          </p>
        </footer>
      </div>
    </main>
  );
}

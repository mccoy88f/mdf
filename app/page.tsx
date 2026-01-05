import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Next.js Starter Template
          </h1>
          <p className="text-xl text-muted-foreground">
            Con PostgreSQL, Prisma e Shadcn/UI
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Next.js 14</CardTitle>
              <CardDescription>
                App Router, Server Components, TypeScript
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
              <CardTitle>PostgreSQL + Prisma</CardTitle>
              <CardDescription>
                Database relazionale con ORM type-safe
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
              <CardTitle>Shadcn/UI</CardTitle>
              <CardDescription>
                Componenti moderni e responsive
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
            Inizia a Sviluppare
          </Button>
          <Button size="lg" variant="outline">
            Documentazione
          </Button>
        </div>

        {/* Info Box */}
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="text-lg">Pronto per iniziare?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <strong>Prisma Studio:</strong> Accedi a{" "}
              <a href="http://localhost:5555" className="text-primary hover:underline" target="_blank">
                http://localhost:5555
              </a>{" "}
              per gestire il database
            </p>
            <p className="text-sm">
              <strong>Database:</strong> PostgreSQL in esecuzione su porta 5432
            </p>
            <p className="text-sm">
              <strong>Hot Reload:</strong> Modifiche automaticamente aggiornate
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

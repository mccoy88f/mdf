# MDF - My Development Framework

**My Development Framework (MDF)** è un template completo per webapp moderne con **Next.js 14**, **PostgreSQL**, **Prisma ORM** e **Shadcn/UI**.

> 🎯 **Uso da GitHub**: Puoi creare un nuovo progetto con un solo comando! Vedi [DEPLOY.md](DEPLOY.md)

```bash
# Setup automatico da GitHub
curl -sSL https://raw.githubusercontent.com/mccoy88f/mdf/main/setup.sh | bash -s -- nome-progetto
```

## 🚀 Stack Tecnologico

- **Next.js 14** - Framework React con App Router e Server Components
- **TypeScript** - Type safety completo
- **PostgreSQL** - Database relazionale robusto
- **Prisma** - ORM moderno con type-safety e migrazioni automatiche
- **Shadcn/UI** - Componenti UI moderni e responsive basati su Radix UI
- **Tailwind CSS** - Styling utility-first
- **Docker** - Containerizzazione completa

### 💾 Risorse

**Development:** ~450-750MB RAM | **Production:** ~200-350MB RAM

**Classificazione:** LIGHT-MEDIUM - Perfetto per VPS da 1GB+ (con swap) o 2GB+ (comodo)

👉 Vedi [PERFORMANCE.md](PERFORMANCE.md) per ottimizzazioni e benchmark dettagliati

## 📋 Prerequisiti

- Docker e Docker Compose installati
- VS Code (raccomandato)
- Estensioni VS Code consigliate:
  - Docker
  - Prisma
  - Tailwind CSS IntelliSense

## 🏁 Quick Start

### Metodo 1: Setup Automatico da GitHub (Consigliato) ⚡

```bash
# Crea un nuovo progetto con un comando
curl -sSL https://raw.githubusercontent.com/TUO-USERNAME/nextjs-starter-template/main/setup.sh | bash -s -- mio-progetto

# Fatto! L'app è disponibile su:
# http://localhost:3000 - App
# http://localhost:5555 - Prisma Studio
```

### Metodo 2: Clone Manuale

### 1. Clona/copia questo template nel tuo nuovo progetto

```bash
cp -r nextjs-starter-template il-mio-nuovo-progetto
cd il-mio-nuovo-progetto
```

### 2. Avvia con Docker Compose

```bash
docker-compose up -d
```

Questo comando:
- Avvia PostgreSQL sulla porta 5432
- Avvia l'app Next.js sulla porta 3000
- Avvia Prisma Studio sulla porta 5555

### 3. Inizializza il database

```bash
# Entra nel container
docker exec -it nextjs-app sh

# Crea le tabelle dal schema Prisma
npm run prisma:push

# (Opzionale) Aggiungi dati di esempio
npx prisma db seed

# Esci dal container
exit
```

**Nota:** Dopo questo comando, Prisma Studio mostrerà le tabelle `users` e `posts` vuote. Puoi aggiungere dati manualmente da Prisma Studio su http://localhost:5555

### 4. Apri l'applicazione

- **App**: http://localhost:3000
- **Prisma Studio** (GUI database): http://localhost:5555

**Nota:** Prisma Studio sarà vuoto al primo avvio. Vedi [DATABASE.md](DATABASE.md) per popolare con dati di esempio.

## 🛠️ Comandi Utili

### Installazione Automatica Pacchetti

Il template include un sistema di **installazione automatica**! Aggiungi pacchetti a `packages.txt` e vengono installati automaticamente al riavvio.

```txt
# packages.txt
axios
lodash
zod
react-hook-form
```

Poi:
```bash
docker-compose restart app
# I pacchetti vengono installati automaticamente! 🎉
```

👉 Vedi [AUTO-INSTALL.md](AUTO-INSTALL.md) per dettagli completi

### Sviluppo

```bash
# Avvia tutto in modalità development
docker-compose up

# Avvia in background
docker-compose up -d

# Ferma tutti i container
docker-compose down

# Ricostruisci i container (dopo modifiche a package.json)
docker-compose up --build
```

### Database & Prisma

```bash
# Accedi al container dell'app
docker exec -it nextjs-app sh

# Genera Prisma Client (dopo modifiche allo schema)
npm run prisma:generate

# Applica modifiche allo schema al database
npm run prisma:push

# Crea una migration
npm run prisma:migrate

# Apri Prisma Studio
npm run prisma:studio
```

### Aggiungere componenti Shadcn/UI

```bash
# Entra nel container
docker exec -it nextjs-app sh

# Aggiungi un componente (es. Dialog)
npx shadcn-ui@latest add dialog

# Aggiungi multipli componenti
npx shadcn-ui@latest add button input label form
```

## 📁 Struttura del Progetto

```
.
├── app/                      # App Router di Next.js
│   ├── api/                  # API Routes
│   │   └── users/           # Esempio CRUD users
│   ├── layout.tsx           # Layout principale
│   ├── page.tsx             # Homepage
│   └── globals.css          # Stili globali
├── components/
│   └── ui/                  # Componenti Shadcn/UI
│       ├── button.tsx
│       └── card.tsx
├── lib/
│   ├── prisma.ts            # Prisma Client singleton
│   └── utils.ts             # Utility functions
├── prisma/
│   └── schema.prisma        # Schema database
├── docker-compose.yml        # Configurazione Docker
├── Dockerfile               # Immagine Docker app
└── package.json             # Dipendenze

```

## 🗃️ Schema Database

Il template include un esempio con due modelli:

- **User** - Utenti con email, nome, password
- **Post** - Post collegati agli utenti

Modifica `prisma/schema.prisma` secondo le tue esigenze e applica con:

```bash
docker exec -it nextjs-app npm run prisma:push
```

## 🎨 UI Components

Il template include già i componenti base di Shadcn/UI:
- Button
- Card

Per aggiungere altri componenti:

```bash
docker exec -it nextjs-app npx shadcn-ui@latest add [component-name]
```

Componenti disponibili: https://ui.shadcn.com/docs/components

## 🔌 API Routes di Esempio

Il template include API REST complete per la gestione utenti:

- `GET /api/users` - Lista tutti gli utenti
- `POST /api/users` - Crea un nuovo utente
- `GET /api/users/[id]` - Recupera un singolo utente
- `PUT /api/users/[id]` - Aggiorna un utente
- `DELETE /api/users/[id]` - Elimina un utente

## 📱 Responsive Design

Tutti i componenti Shadcn/UI sono responsive by default. Tailwind CSS utilizza:

- `sm:` - ≥640px (mobile landscape)
- `md:` - ≥768px (tablet)
- `lg:` - ≥1024px (desktop)
- `xl:` - ≥1280px (large desktop)
- `2xl:` - ≥1536px (extra large)

## 🔧 Personalizzazione

### Tema e Colori

Modifica i colori in `tailwind.config.ts` e `app/globals.css`.

### Database

1. Modifica `prisma/schema.prisma`
2. Applica modifiche: `docker exec -it nextjs-app npm run prisma:push`
3. Rigenera client: `docker exec -it nextjs-app npm run prisma:generate`

### Variabili d'Ambiente

Modifica `.env` per configurare:
- Credenziali database
- URL pubblico
- Altre configurazioni

## 🚢 Deploy Production

### Build dell'immagine

```bash
docker build -t my-app:latest .
```

### Variabili per Production

Crea `.env.production`:

```env
DATABASE_URL="postgresql://user:password@host:5432/db"
NODE_ENV=production
```

## 📚 Risorse

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Shadcn/UI Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 💡 Tips

1. **Hot Reload**: Le modifiche al codice si riflettono automaticamente
2. **Prisma Studio**: Usa http://localhost:5555 per visualizzare/modificare dati
3. **Type Safety**: Prisma genera automaticamente i tipi TypeScript
4. **Logs**: Vedi i log con `docker-compose logs -f app`

## 🐛 Troubleshooting

### Il database non si connette

```bash
# Verifica che il container sia attivo
docker-compose ps

# Controlla i logs
docker-compose logs db
```

### Errore "Module not found"

```bash
# Ricostruisci i container
docker-compose down
docker-compose up --build
```

### Prisma Client non aggiornato

```bash
docker exec -it nextjs-app npm run prisma:generate
```

---

**Pronto per iniziare!** 🎉

Per qualsiasi domanda, controlla la documentazione ufficiale dei singoli strumenti.

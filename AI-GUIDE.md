# 🤖 MDF - AI Assistant Guide

**Guida completa per AI assistants (ChatGPT, Claude, etc.) per aiutare gli sviluppatori a usare MDF**

---

## 📋 PANORAMICA PROGETTO

**Nome:** MDF (My Development Framework)  
**Autore:** @mccoy88f (https://github.com/mccoy88f)  
**Repository:** https://github.com/mccoy88f/mdf  
**Scopo:** Template production-ready per webapp moderne con setup automatizzato

### Stack Tecnologico

```
Frontend:  Next.js 14, TypeScript, Tailwind CSS, Shadcn/UI
Backend:   Next.js API Routes, Prisma ORM
Database:  PostgreSQL 16
i18n:      next-intl (IT/EN preconfigurato)
Deploy:    Docker Compose
```

### Caratteristiche Chiave

- ✅ Setup completamente automatizzato (1 comando)
- ✅ Multilingua (IT/EN) preconfigurato
- ✅ Hot reload automatico
- ✅ Auto-install pacchetti npm
- ✅ Database seed automatico
- ✅ Script cleanup inclusi
- ✅ Documentazione completa

---

## 🚀 COMANDO UNICO SETUP

```bash
curl -sSL https://raw.githubusercontent.com/mccoy88f/mdf/main/setup.sh | bash -s -- nome-progetto
```

**Cosa fa automaticamente:**
1. Clona repository MDF
2. Inizializza nuovo Git repository
3. Personalizza package.json con nome progetto
4. Avvia Docker Compose (PostgreSQL, App, Prisma Studio)
5. Crea tabelle database (prisma:push)
6. Crea utente admin default (prisma:seed)
7. Output: link a app e credenziali

**Output finale:**
```
✅ Setup completato!
   👤 Credenziali Admin:
      Email: admin@mdf.local
      (nessuna password configurata)
   
   📍 Il tuo progetto è pronto:
      📁 Directory: ./nome-progetto
      🌐 App: http://localhost:3000
      💾 Database GUI: http://localhost:5555
```

---

## 📂 STRUTTURA PROGETTO

```
mdf/
├── app/
│   ├── [locale]/              # Route internazionalizzate
│   │   ├── layout.tsx         # Layout principale
│   │   └── page.tsx           # Homepage
│   └── api/                   # API Routes (non i18n)
│       └── users/             # CRUD users esempio
├── components/
│   ├── ui/                    # Shadcn/UI components
│   ├── Link.tsx               # Link i18n wrapper
│   └── LanguageSwitcher.tsx   # Switcher lingua
├── messages/
│   ├── it.json                # Traduzioni italiano
│   └── en.json                # Traduzioni inglese
├── prisma/
│   ├── schema.prisma          # Schema database
│   └── seed.ts                # Seed admin user
├── lib/
│   ├── prisma.ts              # Prisma client singleton
│   └── utils.ts               # Utility functions
├── i18n.ts                    # Config i18n
├── middleware.ts              # Routing i18n
├── packages.txt               # Auto-install pacchetti
├── system-packages.txt        # Auto-install pacchetti sistema
├── docker-compose.yml         # Config Docker
├── setup.sh                   # Script setup automatico
├── cleanup.sh                 # Script rimozione progetto
└── cleanup-all.sh             # Script rimozione tutti i progetti
```

---

## 🎯 WORKFLOW SVILUPPO STANDARD

### 1. Setup Nuovo Progetto

```bash
# Un solo comando
curl -sSL https://raw.githubusercontent.com/mccoy88f/mdf/main/setup.sh | bash -s -- mio-progetto

# Output automatico:
# - Container avviati
# - Database creato
# - Admin user creato
# - Link pronti
```

### 2. Verifica Funzionamento

```bash
# Apri browser
http://localhost:3000      # App (redirect a /it/)
http://localhost:3000/it/  # Versione italiana
http://localhost:3000/en/  # Versione inglese
http://localhost:5555      # Prisma Studio (GUI database)
```

### 3. Apri con Editor

```bash
cd mio-progetto
code .  # VS Code
```

### 4. Sviluppo

- Modifica file in `app/[locale]/`
- Salva → Hot reload automatico
- Aggiungi traduzioni in `messages/*.json`
- Schema database in `prisma/schema.prisma`

---

## 📝 COMANDI ESSENZIALI

### Container Management

```bash
# Avvia tutto
docker-compose up -d

# Ferma tutto
docker-compose down

# Riavvia
docker-compose restart app

# Logs in tempo reale
docker-compose logs -f app

# Status container
docker-compose ps
```

### Database Operations

```bash
# Entra nel container app
docker exec -it nextjs-app sh

# Crea/aggiorna tabelle
npm run prisma:push

# Rigenera Prisma Client
npm run prisma:generate

# Seed database (crea admin)
npm run prisma:seed

# Apri Prisma Studio
npm run prisma:studio
```

### Package Management

```bash
# Aggiungi pacchetto npm
echo "axios" >> packages.txt
docker-compose restart app
# Installato automaticamente!

# Aggiungi componente Shadcn/UI
docker exec -it nextjs-app npx shadcn-ui@latest add dialog
```

---

## 🌍 INTERNAZIONALIZZAZIONE

### Struttura i18n

```
URL: /it/pagina → Italiano
URL: /en/pagina → Inglese

messages/it.json → Traduzioni italiano
messages/en.json → Traduzioni inglese
```

### Aggiungere Traduzioni

**1. Aggiungi in messages/it.json**
```json
{
  "MiaPage": {
    "titolo": "Benvenuto",
    "descrizione": "Questa è la descrizione"
  }
}
```

**2. Aggiungi in messages/en.json**
```json
{
  "MyPage": {
    "titolo": "Welcome",
    "descrizione": "This is the description"
  }
}
```

**3. Usa nel componente**
```tsx
import { useTranslations } from 'next-intl';

export default function MiaPage() {
  const t = useTranslations('MiaPage');
  return <h1>{t('titolo')}</h1>;
}
```

### Aggiungere Nuova Lingua

```typescript
// 1. i18n.ts
export const locales = ['en', 'it', 'es'] as const;

// 2. Crea messages/es.json
// 3. Riavvia: docker-compose restart app
```

---

## 🗄️ DATABASE & PRISMA

### Schema di Default

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Modificare Schema

```bash
# 1. Modifica prisma/schema.prisma
# 2. Applica modifiche
docker exec -it nextjs-app npm run prisma:push
# 3. Rigenera client
docker exec -it nextjs-app npm run prisma:generate
```

### Admin User Default

```
Email: admin@mdf.local
Password: nessuna (aggiungi autenticazione tu)
```

Creato automaticamente dallo script setup.

---

## 🚀 DEPLOY SU NUOVO REPOSITORY GITHUB

### Metodo Completo (Consigliato)

```bash
# 1. Crea repository su GitHub
# Vai su https://github.com/new
# Nome: mio-nuovo-progetto

# 2. Setup locale
curl -sSL https://raw.githubusercontent.com/mccoy88f/mdf/main/setup.sh | bash -s -- mio-nuovo-progetto
cd mio-nuovo-progetto

# 3. Personalizza (opzionale)
# - Modifica app/[locale]/page.tsx
# - Modifica messages/*.json
# - Modifica prisma/schema.prisma

# 4. Push su GitHub (con GitHub CLI)
gh auth login
gh repo create mio-nuovo-progetto --public --source=. --push

# OPPURE con SSH
git remote add origin git@github.com:tuo-username/mio-nuovo-progetto.git
git add .
git commit -m "Initial commit from MDF template"
git push -u origin main

# OPPURE con HTTPS + Token
git remote add origin https://github.com/tuo-username/mio-nuovo-progetto.git
git push -u origin main
# Username: tuo-username
# Password: [TOKEN da github.com/settings/tokens]
```

### Quick Deploy (Solo Code)

Se vuoi solo il codice senza setup completo:

```bash
# 1. Clona MDF
git clone https://github.com/mccoy88f/mdf.git mio-progetto
cd mio-progetto

# 2. Rimuovi Git history
rm -rf .git
git init

# 3. Personalizza
# ... le tue modifiche ...

# 4. Push
gh repo create mio-progetto --public --source=. --push
```

---

## 🧹 CLEANUP & RIMOZIONE

### Rimuovi Singolo Progetto

```bash
./cleanup.sh nome-progetto
# Digita: DELETE
# Rimuove: container, volumi, immagini, directory
```

### Rimuovi Tutti i Progetti MDF

```bash
./cleanup-all.sh
# Digita: DELETE ALL
# Rimuove tutti i container/volumi/immagini MDF
```

---

## 🔧 TROUBLESHOOTING COMUNI

### Permission Denied (Docker)

```bash
# Soluzione permanente
sudo usermod -aG docker $USER
# Poi LOGOUT/LOGIN o RIAVVIA

# Soluzione temporanea
sudo docker-compose up -d
```

### Porta già in uso

```bash
# Trova processo
sudo lsof -i :3000

# Termina
sudo kill -9 PID

# O cambia porta in docker-compose.yml
ports: - "3001:3000"
```

### Hot Reload non funziona

```bash
# Aggiungi a .env
echo "WATCHPACK_POLLING=true" >> .env
docker-compose restart app
```

### Database non si connette

```bash
# Verifica container
docker-compose ps

# Ricrea tabelle
docker exec -it nextjs-app npm run prisma:push
```

---

## 🎓 BEST PRACTICES PER SVILUPPATORI

### ✅ DO

- **Usa sempre traduzioni** - Mai hardcoded
- **Testa entrambe le lingue** (IT/EN)
- **Usa Prisma per database** - Type-safe
- **Usa Shadcn/UI per componenti** - Consistenza
- **Commit frequentemente** - Git workflow

### ❌ DON'T

- ~~`<h1>Benvenuto</h1>`~~ → Usa `{t('welcome')}`
- ~~`import Link from 'next/link'`~~ → Usa `import { Link } from '@/components/Link'`
- ~~Modificare direttamente DB~~ → Usa Prisma migrations
- ~~Container con `docker run`~~ → Usa `docker-compose`

---

## 📚 DOCUMENTAZIONE DISPONIBILE

Tutti i file `.md` sono documentazione:

```
README.md           - Panoramica generale
QUICKSTART.md       - Avvio rapido (3 comandi)
I18N.md             - Guida internazionalizzazione
DATABASE.md         - Gestione database Prisma
AUTO-INSTALL.md     - Auto-installazione pacchetti
PERFORMANCE.md      - Ottimizzazioni e benchmark
CLEANUP.md          - Script rimozione progetti
CREDENTIALS.md      - Credenziali e autenticazione
TROUBLESHOOTING.md  - Risoluzione problemi
GITHUB-SETUP.md     - Pubblicazione GitHub
DEPLOY.md           - Opzioni deploy
SSH-SETUP.md        - Configurazione SSH Git
AI-GUIDE.md         - Questa guida (per AI)
```

---

## 🤖 ISTRUZIONI PER AI ASSISTANT

### Quando un utente chiede aiuto su MDF:

1. **Verifica setup**
   - Hanno eseguito il comando curl?
   - I container sono avviati? (`docker-compose ps`)
   - L'app risponde? (http://localhost:3000)

2. **Guida step-by-step**
   - Un passo alla volta
   - Comandi esatti e copiabili
   - Verifica output ad ogni step

3. **Troubleshooting**
   - Vedi sezione TROUBLESHOOTING
   - Chiedi logs: `docker-compose logs -f app`
   - Verifica permessi Docker

4. **Personalizzazione**
   - Traduzioni → `messages/*.json`
   - Schema DB → `prisma/schema.prisma`
   - UI → `app/[locale]/page.tsx`
   - Pacchetti → `packages.txt`

### Domande Frequenti e Risposte Pronte

**Q: "Come installo MDF?"**
```bash
curl -sSL https://raw.githubusercontent.com/mccoy88f/mdf/main/setup.sh | bash -s -- mio-progetto
```

**Q: "Come aggiungo una pagina?"**
```bash
# Crea app/[locale]/about/page.tsx
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');
  return <h1>{t('title')}</h1>;
}

# Aggiungi traduzioni in messages/it.json e messages/en.json
```

**Q: "Come aggiungo un campo al database?"**
```bash
# 1. Modifica prisma/schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
  age   Int?   # ← Nuovo campo
}

# 2. Applica
docker exec -it nextjs-app npm run prisma:push
```

**Q: "Come installo una libreria?"**
```bash
# Aggiungi a packages.txt
echo "axios" >> packages.txt

# Riavvia
docker-compose restart app
```

**Q: "Come pubblico su GitHub?"**
```bash
# Con GitHub CLI
gh auth login
gh repo create mio-progetto --public --source=. --push

# Con SSH
git remote add origin git@github.com:username/mio-progetto.git
git push -u origin main
```

**Q: "Come rimuovo un progetto?"**
```bash
./cleanup.sh nome-progetto
# Digita: DELETE
```

---

## 🎯 TEMPLATE RISPOSTE AI

### Setup Nuovo Progetto

"Ecco come creare un nuovo progetto con MDF:

```bash
curl -sSL https://raw.githubusercontent.com/mccoy88f/mdf/main/setup.sh | bash -s -- [NOME-PROGETTO]
```

Sostituisci `[NOME-PROGETTO]` con il nome del tuo progetto.

Lo script farà automaticamente:
- Setup completo del progetto
- Avvio container Docker
- Creazione database
- Utente admin predefinito

Quando finisce, apri:
- App: http://localhost:3000
- Database: http://localhost:5555

Admin: admin@mdf.local (senza password)"

### Aggiungere Funzionalità

"Per aggiungere [FUNZIONALITÀ], segui questi step:

1. [PASSO 1 con comando]
2. [PASSO 2 con comando]
3. Verifica: [come testare]

Documenti utili:
- [LINK.md] per maggiori dettagli"

### Errori Docker

"Vedo che hai un errore Docker. Proviamo:

```bash
# Verifica che Docker sia in esecuzione
docker ps

# Se errore permessi:
sudo usermod -aG docker $USER
# Poi LOGOUT e LOGIN

# Verifica di nuovo
docker ps
```

Funziona ora?"

---

## 🔗 LINK UTILI

- **Repository MDF:** https://github.com/mccoy88f/mdf
- **Autore:** https://github.com/mccoy88f
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Shadcn/UI:** https://ui.shadcn.com
- **next-intl:** https://next-intl-docs.vercel.app

---

## 📊 STATISTICHE PROGETTO

```
Lingue supportate: IT, EN (facilmente espandibile)
RAM Development:   450-750MB
RAM Production:    200-350MB
Classificazione:   LIGHT-MEDIUM
Container:         3 (app, db, prisma-studio)
Porte:            3000 (app), 5432 (db), 5555 (studio)
Setup time:       ~30 secondi (con rete veloce)
```

---

## ✅ CHECKLIST SUPPORTO AI

Prima di rispondere, verifica:

- [ ] L'utente ha Docker installato?
- [ ] Ha eseguito il comando setup?
- [ ] I container sono avviati?
- [ ] Ha permessi Docker corretti?
- [ ] Ha visto la documentazione rilevante?
- [ ] Ha provato il troubleshooting base?

Se tutto ok → Aiuta con la personalizzazione
Se problema → Debug step-by-step

---

**🤖 Questa guida aiuta gli AI assistant a fornire supporto efficace e accurato agli sviluppatori che usano MDF!**

**Mantieni le risposte:**
- ✅ Concise e actionable
- ✅ Con comandi copy-paste pronti
- ✅ Step-by-step verificabili
- ✅ Con link alla documentazione

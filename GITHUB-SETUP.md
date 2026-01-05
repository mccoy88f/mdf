# 🚀 Pubblicazione Rapida su GitHub

## Step by Step

### 1️⃣ Crea il repository su GitHub

1. Vai su https://github.com/new
2. Nome repository: `nextjs-starter-template`
3. Descrizione: "Template Next.js + PostgreSQL + Prisma + Shadcn/UI"
4. Pubblico o Privato (come preferisci)
5. ❌ NON aggiungere README/gitignore/license (li abbiamo già)
6. Click "Create repository"

### 2️⃣ Pubblica il codice

```bash
# Estrai lo ZIP
unzip nextjs-starter-template.zip
cd nextjs-starter-template

# Inizializza Git
git init
git add .
git commit -m "Initial commit: Next.js starter template"

# Sostituisci TUO-USERNAME con il tuo username GitHub
git remote add origin https://github.com/TUO-USERNAME/nextjs-starter-template.git

# Push
git branch -M main
git push -u origin main
```

### 3️⃣ Configura come Template (Opzionale)

1. Su GitHub vai al tuo repository
2. Click **Settings** (in alto a destra)
3. Sezione **General**
4. Spunta ✅ **Template repository**
5. Save

### 4️⃣ Aggiorna lo script setup.sh

Nel file `setup.sh`, sostituisci `TUO-USERNAME` con il tuo username GitHub:

```bash
# Cerca questa riga:
git clone https://github.com/TUO-USERNAME/nextjs-starter-template.git "$PROJECT_NAME"

# Cambiala con:
git clone https://github.com/il-tuo-username/nextjs-starter-template.git "$PROJECT_NAME"
```

Poi:
```bash
git add setup.sh
git commit -m "Update GitHub username in setup script"
git push
```

### 5️⃣ Testa il setup remoto

```bash
# Da un'altra directory, prova:
curl -sSL https://raw.githubusercontent.com/TUO-USERNAME/nextjs-starter-template/main/setup.sh | bash -s -- test-progetto

# Se funziona, sei pronto! 🎉
```

## 🎯 Ora puoi creare progetti con un solo comando!

```bash
# Crea un nuovo progetto da GitHub
curl -sSL https://raw.githubusercontent.com/TUO-USERNAME/nextjs-starter-template/main/setup.sh | bash -s -- nome-progetto

# Oppure usa "Use this template" su GitHub
```

## 📝 Personalizzazioni Opzionali

### Badge per README

Aggiungi questi badge in cima al README.md:

```markdown
![GitHub](https://img.shields.io/github/license/TUO-USERNAME/nextjs-starter-template)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
```

### GitHub Actions

Il file `.github/workflows/ci.yml` è già incluso! Ad ogni push verrà:
- ✅ Buildato il progetto
- ✅ Testata l'app
- ✅ Verificata la connessione al database

## 🔄 Aggiornamenti Futuri

Quando migliori il template:

```bash
git add .
git commit -m "feat: aggiunti nuovi componenti"
git push
```

Tutti i nuovi progetti useranno automaticamente la versione aggiornata!

---

**Domande?** Apri un issue su GitHub: https://github.com/TUO-USERNAME/nextjs-starter-template/issues

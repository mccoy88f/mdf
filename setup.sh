#!/bin/bash

# Script di setup automatico per Next.js Starter Template
# Usage: curl -sSL https://raw.githubusercontent.com/TUO-USERNAME/nextjs-starter-template/main/setup.sh | bash -s -- nome-progetto

set -e

PROJECT_NAME=${1:-my-nextjs-app}

echo "🚀 Setup Next.js Starter Template: $PROJECT_NAME"
echo ""

# Verifica Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker non trovato. Installalo da: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose non trovato. Installalo da: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker trovato"
echo ""

# Clona il repository
echo "📥 Clonazione repository..."
git clone https://github.com/TUO-USERNAME/nextjs-starter-template.git "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Rimuovi .git per iniziare un nuovo repository
rm -rf .git
git init

echo "✅ Repository clonato"
echo ""

# Personalizza package.json
echo "📝 Personalizzazione package.json..."
if [ "$(uname)" == "Darwin" ]; then
    # macOS
    sed -i '' "s/\"name\": \"nextjs-starter-template\"/\"name\": \"$PROJECT_NAME\"/" package.json
else
    # Linux
    sed -i "s/\"name\": \"nextjs-starter-template\"/\"name\": \"$PROJECT_NAME\"/" package.json
fi

echo "✅ Progetto personalizzato"
echo ""

# Avvia Docker Compose
echo "🐳 Avvio container Docker..."
docker-compose up -d

echo "⏳ Attendo che i container siano pronti..."
sleep 10

# Inizializza database
echo "🗄️  Inizializzazione database..."
docker exec -it nextjs-app npm run prisma:push

echo ""
echo "✅ Setup completato!"
echo ""
echo "📍 Il tuo progetto è pronto:"
echo "   📁 Directory: ./$PROJECT_NAME"
echo "   🌐 App: http://localhost:3000"
echo "   💾 Database GUI: http://localhost:5555"
echo ""
echo "🛠️  Comandi utili:"
echo "   docker-compose logs -f          # Vedi i logs"
echo "   docker-compose down             # Ferma tutto"
echo "   docker-compose restart          # Riavvia"
echo ""
echo "📚 Documentazione completa: README.md"
echo ""

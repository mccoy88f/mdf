#!/bin/bash

# Script di setup automatico per MDF (My Development Framework)
# Usage: curl -sSL https://raw.githubusercontent.com/mccoy88f/mdf/main/setup.sh | bash -s -- nome-progetto

set -e

PROJECT_NAME=${1:-my-mdf-app}

echo "🚀 Setup MDF (My Development Framework): $PROJECT_NAME"
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

# Verifica permessi Docker
if ! docker ps &> /dev/null; then
    echo ""
    echo "⚠️  PERMESSI DOCKER MANCANTI"
    echo ""
    echo "Devi aggiungere il tuo utente al gruppo docker:"
    echo ""
    echo "  sudo usermod -aG docker \$USER"
    echo "  newgrp docker"
    echo ""
    echo "Oppure esegui con sudo:"
    echo "  sudo -E bash -c 'curl -sSL https://raw.githubusercontent.com/mccoy88f/mdf/main/setup.sh | bash -s -- $PROJECT_NAME'"
    echo ""
    
    # Chiedi se usare sudo
    read -p "Vuoi continuare con sudo? (s/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "❌ Setup annullato. Configura i permessi Docker e riprova."
        exit 1
    fi
    
    # Se l'utente vuole sudo, usa sudo per docker-compose
    DOCKER_CMD="sudo docker-compose"
    DOCKER_EXEC="sudo docker exec"
else
    # Permessi OK, usa comandi normali
    DOCKER_CMD="docker-compose"
    DOCKER_EXEC="docker exec"
fi

echo ""

# Clona il repository
echo "📥 Clonazione repository MDF..."
git clone https://github.com/mccoy88f/mdf.git "$PROJECT_NAME"
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

# Popola con dati di esempio (opzionale)
echo "🌱 Vuoi popolare il database con dati di esempio? (s/n)"
read -r response
if [[ "$response" =~ ^([sS][iI]|[sS])$ ]]; then
  docker exec -it nextjs-app npm run prisma:seed
  echo "✅ Database popolato con dati di esempio"
else
  echo "⏭️  Database non popolato (puoi farlo dopo con: docker exec -it nextjs-app npm run prisma:seed)"
fi

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

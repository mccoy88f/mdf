FROM node:20-alpine

WORKDIR /app

# Installa dipendenze di sistema necessarie
RUN apk add --no-cache libc6-compat openssl

# Copia package files
COPY package*.json ./
COPY prisma ./prisma/

# Installa dipendenze
RUN npm install

# Genera Prisma Client
RUN npx prisma generate

# Copia il resto del codice
COPY . .

# Esponi porte
EXPOSE 3000 5555

# Default command (verrà sovrascritto da docker-compose)
CMD ["npm", "run", "dev"]

# Utiliser l'image officielle de Bun
FROM oven/bun:latest as builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json bun.lockb ./

# Installer les dépendances
RUN bun install --frozen-lockfile

# Copier le reste des fichiers
COPY . .

# Build de l'application Next.js
RUN bun run build

# Image de production
FROM oven/bun:latest as runner
WORKDIR /app

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Exposer le port
EXPOSE 3000

# Définir les variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Commande de démarrage
CMD ["bun", "server.js"]

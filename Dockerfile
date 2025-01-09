# Étape 1 : Image de base avec Bun
FROM oven/bun:1-alpine AS base

# Étape 2 : Construction des sources
FROM base AS builder

WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json bun.lockb ./

# Installer les dépendances
RUN bun install --frozen-lockfile

# Copier le reste du code source
COPY . .

# Définir les variables d'environnement nécessaires à la compilation
ARG DATABASE_URL
ARG RESEND_API_KEYARG
ARG TRIGGER_SECRET_KEY
ARG TRIGGER_PUBLIC_API_KEY
ARG NEXT_PUBLIC_POSTHOG_KEY
ARG UPLOADTHING_TOKEN
ARG NEXT_PUBLIC_POSTHOG_HOST
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL

# Env vars pour build
ENV DATABASE_URL=${DATABASE_URL}
ENV RESEND_API_KEYARG=${RESEND_API_KEYARG}
ENV TRIGGER_SECRET_KEY=${TRIGGER_SECRET_KEY}
ENV TRIGGER_PUBLIC_API_KEY=${TRIGGER_PUBLIC_API_KEY}
ENV NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY}
ENV UPLOADTHING_TOKEN=${UPLOADTHING_TOKEN}
ENV NEXT_PUBLIC_POSTHOG_HOST=${NEXT_PUBLIC_POSTHOG_HOST}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
ENV BETTER_AUTH_URL=${BETTER_AUTH_URL}

# Construire l'application Next.js
RUN bun run build

# Étape 3 : Préparer l'image de production
FROM base AS runner

WORKDIR /app

# Installer les dépendances nécessaires à l'exécution
RUN apk --no-cache add curl

# Ajouter un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs
USER nextjs

# Copier les fichiers nécessaires à l'exécution
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Redéfinir les variables d'environnement pour l'exécution
ENV DATABASE_URL=${DATABASE_URL}
ENV RESEND_API_KEYARG=${RESEND_API_KEYARG}
ENV TRIGGER_SECRET_KEY=${TRIGGER_SECRET_KEY}
ENV TRIGGER_PUBLIC_API_KEY=${TRIGGER_PUBLIC_API_KEY}
ENV NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY}
ENV UPLOADTHING_TOKEN=${UPLOADTHING_TOKEN}
ENV NEXT_PUBLIC_POSTHOG_HOST=${NEXT_PUBLIC_POSTHOG_HOST}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
ENV BETTER_AUTH_URL=${BETTER_AUTH_URL}

# Exposer le port 3000
EXPOSE 3000

# Définir le port par défaut
ENV PORT 3000

# Commande pour démarrer l'application
CMD ["node", "server.js"]

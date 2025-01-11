# Utilisation de l'image Bun officielle comme base
FROM oven/bun:1 as base

# Installation des dépendances
FROM base AS deps
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Construction de l'application
FROM base AS builder
WORKDIR /app

# Copie des dépendances de l'étape précédente
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement nécessaires pour la construction
ARG DATABASE_URL
ARG RESEND_API_KEY
ARG TRIGGER_SECRET_KEY
ARG TRIGGER_PUBLIC_API_KEY
ARG NEXT_PUBLIC_POSTHOG_KEY
ARG UPLOADTHING_TOKEN
ARG NEXT_PUBLIC_POSTHOG_HOST
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL

# Configuration des variables d'environnement pour la construction
ENV DATABASE_URL=${DATABASE_URL}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV TRIGGER_SECRET_KEY=${TRIGGER_SECRET_KEY}
ENV TRIGGER_PUBLIC_API_KEY=${TRIGGER_PUBLIC_API_KEY}
ENV NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY}
ENV UPLOADTHING_TOKEN=${UPLOADTHING_TOKEN}
ENV NEXT_PUBLIC_POSTHOG_HOST=${NEXT_PUBLIC_POSTHOG_HOST}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
ENV BETTER_AUTH_URL=${BETTER_AUTH_URL}

# Construction de l'application Next.js
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

# Image de production
FROM base AS runner
WORKDIR /app

# Installation des dépendances système nécessaires
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Création d'un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Configuration de l'environnement de production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copie des fichiers nécessaires
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Variables d'environnement pour la production
ARG DATABASE_URL
ARG RESEND_API_KEY
ARG TRIGGER_SECRET_KEY
ARG TRIGGER_PUBLIC_API_KEY
ARG NEXT_PUBLIC_POSTHOG_KEY
ARG UPLOADTHING_TOKEN
ARG NEXT_PUBLIC_POSTHOG_HOST
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL

ENV DATABASE_URL=${DATABASE_URL}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV TRIGGER_SECRET_KEY=${TRIGGER_SECRET_KEY}
ENV TRIGGER_PUBLIC_API_KEY=${TRIGGER_PUBLIC_API_KEY}
ENV NEXT_PUBLIC_POSTHOG_KEY=${NEXT_PUBLIC_POSTHOG_KEY}
ENV UPLOADTHING_TOKEN=${UPLOADTHING_TOKEN}
ENV NEXT_PUBLIC_POSTHOG_HOST=${NEXT_PUBLIC_POSTHOG_HOST}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
ENV BETTER_AUTH_URL=${BETTER_AUTH_URL}

# Configuration du port
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Commande de démarrage
CMD ["bun", "server.js"]


FROM oven/bun:alpine AS base

# Étape 1 : Installer les dépendances
FROM base AS deps
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Étape 2 : Construire l'application
FROM base AS builder

# Définir les variables d'environnement pour la compilation
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG RESEND_API_KEY
ENV RESEND_API_KEY=$RESEND_API_KEY

ARG TRIGGER_SECRET_KEY
ENV TRIGGER_SECRET_KEY=$TRIGGER_SECRET_KEY

ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

ARG BETTER_AUTH_SECRET
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET

ARG BETTER_AUTH_URL
ENV BETTER_AUTH_URL=$BETTER_AUTH_URL

WORKDIR /usr/src/app
COPY --from=deps /usr/src/app .
COPY . . 
RUN bun run build

# Étape 3 : Préparer l'image finale
FROM base AS runner

WORKDIR /usr/src/app

# Ajouter un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/app ./app
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Définir les permissions
RUN chown -R nextjs:nodejs .

USER nextjs

# Exposer le port
ENV HOSTNAME "0.0.0.0"
ENV PORT=3000
EXPOSE 3000

CMD ["bun", "run", "start"]

FROM oven/bun:1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables must be present at build time
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

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Environment variables must be redefined at run time
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

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["bun", "run", "start"]


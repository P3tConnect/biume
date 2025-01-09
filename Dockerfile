FROM oven/bun:1-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY /package.json /

# Omit --production flag for TypeScript devDependencies
RUN bun install --frozen-lockfile

# Adjust the files and folders that should be copied to the build container
COPY app ./app
COPY public ./public
COPY components ./components
COPY emails ./emails
COPY src ./src
COPY next.config.mjs .
COPY middleware.ts .
COPY components.json .
COPY tailwind.config.js .
COPY tsconfig.json .
COPY postcss.config.mjs .
COPY package.json .
COPY trigger.config.ts .
COPY drizzle.config.ts .

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

# env
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

# Build Next.js based on the preferred package manager
RUN bun run build

# Step 2. Production image, copy all the files and run next
FROM base AS runner

RUN apk --no-cache add curl

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/ ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
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

# env
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

CMD HOSTNAME=0.0.0.0 node server.js
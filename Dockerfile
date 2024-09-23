FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* bun.lockb* ./
# Omit --production flag for TypeScript devDependencies
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
    elif [ -f bun.lockb ]; then corepack enable bun && bun install; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

# Adjust the files and folders that should be copied to the build container
COPY app ./app
COPY public ./public
COPY components ./components
COPY emails ./emails
COPY src ./src
COPY next.config.mjs .
COPY middleware.ts .
COPY next-auth.d.ts .
COPY components.json .
COPY tailwind.config.js .
COPY tsconfig.json .
COPY postcss.config.mjs .
COPY package.json .
COPY bun.lockb .
COPY trigger.config.ts .
COPY drizzle.config.ts .

# Environment variables must be present at build time
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Build Next.js based on the preferred package manager
RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm build; \
    elif [ -f bun.lockb ]; then bun run build; \
    else npm run build; \
    fi

# Step 2. Production image, copy all the files and run next
FROM base AS runner

RUN apk --no-cache add curl

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME=0.0.0.0 node server.js

FROM oven/bun:alpine AS base

# Step 1 - install dependencies
FROM base AS deps
WORKDIR /usr/src/app
COPY package.json ./ 
COPY bun.lockb ./
RUN bun install --frozen-lockfile

# Step 2 - rebuild the app
FROM base AS builder

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

RUN bun next build

# Step 3 - copy all the files and run server
FROM base AS runner

WORKDIR /usr/src/app


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/src/app/ ./public

COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

USER nextjs

ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
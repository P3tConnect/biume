FROM oven/bun:1-alpine AS base

FROM base AS builder

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

RUN apk --no-cache add curl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["bun", "run", "build"]
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 todoApp 
USER todoApp

COPY --from=builder /app/public ./public
COPY --from=builder --chown=todoApp:nodejs /app/.next/standalone ./
COPY --from=builder --chown=todoApp:nodejs /app/.next/static ./.next/static

CMD ["node", "server.js"]

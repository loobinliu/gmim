FROM node:22-slim AS base

WORKDIR /app

RUN apt-get update && apt-get install -y \

    python3 \

    make \

    g++ \

    pkg-config \

    fontconfig \

    fonts-noto-cjk \

    && rm -rf /var/lib/apt/lists/*


ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./

RUN npm ci

FROM base AS builder
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN npm run db:generate
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs --create-home nextjs
RUN mkdir -p /app/data /home/nextjs/.cache/fontconfig \
    && fc-cache -f \
    && chown -R nextjs:nodejs /app/data /home/nextjs/.cache

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/app/generated ./app/generated
COPY --from=builder /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]

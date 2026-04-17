FROM node:20-bookworm-slim AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:20-bookworm-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app

RUN groupadd --system nodejs \
    && useradd --system --gid nodejs --create-home --shell /usr/sbin/nologin epicbook \
    && mkdir -p /app/logs \
    && chown -R epicbook:nodejs /app

COPY --from=deps --chown=epicbook:nodejs /app/node_modules ./node_modules
COPY --chown=epicbook:nodejs . .

USER epicbook

EXPOSE 8080

CMD ["node", "server.js"]

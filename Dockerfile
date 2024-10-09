FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm && pnpm run build

# Production image, copy all the files and run next
FROM nginx:1.27.2-alpine3.20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# ARG PUID=1000
# ARG PGID=1000

# node 이미지에는 node(1000) 사용자와 node(1000) 그룹이 이미 있음
# RUN addgroup --gid ${PGID} runner && \
#     adduser -u ${PUID} -G runner -s /bin/sh -D runner

# -- Set the correct permission for prerender cache
# RUN mkdir .next && chown ${PUID}:${PGID} .next
# COPY --from=builder --chown=${PUID}:${PGID} /app/dist ./
# COPY --from=builder --chown=${PUID}:${PGID} /app/nginx.conf /etc/nginx/nginx.conf
RUN mkdir .next
COPY --from=builder /app/dist ./
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# VOLUME /app/data
# USER ${PUID}:${PGID}
# ENV DATABASE_URL="file:/app/data/data.db"
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

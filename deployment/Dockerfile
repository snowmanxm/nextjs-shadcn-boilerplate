# ============================================
# Builder Stage - Install deps and build app
# ============================================
FROM node:jod-alpine AS builder

ARG AUTH_SECRET
ARG AUTH_URL
ARG LIVEKIT_AGENT_NAME
ARG LIVEKIT_API_KEY
ARG LIVEKIT_API_SECRET
ARG LIVEKIT_URL
ARG NEXT_PUBLIC_BACKEND_API_URL
ARG NEXT_PUBLIC_CDN_URL
ARG NEXT_PUBLIC_FIREBASE_CONFIG
ARG NEXT_PUBLIC_INTERCOM_APP_ID
ARG NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_WHATSAPP_FEATURES_ENABLED
ARG NEXT_PUBLIC_INVITATION_CODE_ENABLED
ARG NODE_ENV
ARG MICROSOFT_IDENTITY_ASSOCIATION

ENV AUTH_SECRET=${AUTH_SECRET} \
  AUTH_URL=${AUTH_URL} \
  LIVEKIT_AGENT_NAME=${LIVEKIT_AGENT_NAME} \
  LIVEKIT_API_KEY=${LIVEKIT_API_KEY} \
  LIVEKIT_API_SECRET=${LIVEKIT_API_SECRET} \
  LIVEKIT_URL=${LIVEKIT_URL} \
  NEXT_PUBLIC_BACKEND_API_URL=${NEXT_PUBLIC_BACKEND_API_URL} \
  NEXT_PUBLIC_CDN_URL=${NEXT_PUBLIC_CDN_URL} \
  NEXT_PUBLIC_FIREBASE_CONFIG=${NEXT_PUBLIC_FIREBASE_CONFIG} \
  NEXT_PUBLIC_INTERCOM_APP_ID=${NEXT_PUBLIC_INTERCOM_APP_ID} \
  NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=${NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN} \
  NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
  NEXT_PUBLIC_WHATSAPP_FEATURES_ENABLED=${NEXT_PUBLIC_WHATSAPP_FEATURES_ENABLED} \
  NEXT_PUBLIC_INVITATION_CODE_ENABLED=${NEXT_PUBLIC_INVITATION_CODE_ENABLED} \
  NODE_ENV=${NODE_ENV} \
  MICROSOFT_IDENTITY_ASSOCIATION=${MICROSOFT_IDENTITY_ASSOCIATION}

WORKDIR /app

# Install dependencies for native modules if needed
RUN apk add --no-cache libc6-compat python3 \
  && ln -sf python3 /usr/bin/python

# Copy package files for dependency installation
COPY package.json yarn.lock tsconfig.base.json ./
COPY shared ./shared
COPY web ./web
COPY scripts/sync-agent-rules.py ./scripts/sync-agent-rules.py
COPY .ai ./.ai

# Modify workspaces to exclude mobile dependencies
RUN node -e "const pkg=require('./package.json'); pkg.workspaces=['web','shared']; require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));"

# Install all dependencies (including devDependencies for build)
RUN yarn install --frozen-lockfile --production=false && \
    yarn cache clean

# Copy source code

# Build Next.js application
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn web:build

# ============================================
# Production Stage - Minimal runtime image
# ============================================
FROM node:jod-alpine AS production

ARG AUTH_SECRET
ARG AUTH_URL
ARG LIVEKIT_AGENT_NAME
ARG LIVEKIT_API_KEY
ARG LIVEKIT_API_SECRET
ARG LIVEKIT_URL
ARG NEXT_PUBLIC_BACKEND_API_URL
ARG NEXT_PUBLIC_CDN_URL
ARG NEXT_PUBLIC_FIREBASE_CONFIG
ARG NEXT_PUBLIC_INTERCOM_APP_ID
ARG NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_WHATSAPP_FEATURES_ENABLED
ARG NEXT_PUBLIC_INVITATION_CODE_ENABLED
ARG NODE_ENV

ENV AUTH_SECRET=${AUTH_SECRET} \
  AUTH_URL=${AUTH_URL} \
  LIVEKIT_AGENT_NAME=${LIVEKIT_AGENT_NAME} \
  LIVEKIT_API_KEY=${LIVEKIT_API_KEY} \
  LIVEKIT_API_SECRET=${LIVEKIT_API_SECRET} \
  LIVEKIT_URL=${LIVEKIT_URL} \
  NEXT_PUBLIC_BACKEND_API_URL=${NEXT_PUBLIC_BACKEND_API_URL} \
  NEXT_PUBLIC_CDN_URL=${NEXT_PUBLIC_CDN_URL} \
  NEXT_PUBLIC_FIREBASE_CONFIG=${NEXT_PUBLIC_FIREBASE_CONFIG} \
  NEXT_PUBLIC_INTERCOM_APP_ID=${NEXT_PUBLIC_INTERCOM_APP_ID} \
  NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=${NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN} \
  NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
  NEXT_PUBLIC_WHATSAPP_FEATURES_ENABLED=${NEXT_PUBLIC_WHATSAPP_FEATURES_ENABLED} \
  NEXT_PUBLIC_INVITATION_CODE_ENABLED=${NEXT_PUBLIC_INVITATION_CODE_ENABLED} \
  NODE_ENV=${NODE_ENV}

WORKDIR /app

# Install runtime dependencies and python compatibility
RUN apk add --no-cache dumb-init python3 \
  && ln -sf python3 /usr/bin/python

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output from builder
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/static ./web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/web/public ./web/public

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Switch to non-root user for security
USER nextjs

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

EXPOSE 8080

# Start the application
CMD ["node", "web/server.js"]

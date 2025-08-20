# Production Docker image for Gordery Backend APIs
# This image expects pre-built application code to be copied in
# Built artifacts should be available in the build context

FROM docker.io/node:lts-alpine AS runner

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy built application and required files
COPY --chown=nodejs:nodejs apps/apis/dist/ ./
COPY --chown=nodejs:nodejs node_modules/ ./node_modules/
COPY --chown=nodejs:nodejs packages/prisma/scheams/ ./packages/prisma/scheams/

# Copy package.json for runtime metadata
COPY --chown=nodejs:nodejs apps/apis/package.json ./

# Expose port
EXPOSE 3000

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); http.get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["node", "main.js"]

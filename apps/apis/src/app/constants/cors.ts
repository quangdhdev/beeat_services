export const CORS_CONFIG = {
    DEFAULT_ALLOWED_ORIGINS: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4200',
      'http://localhost:8080',
      'https://beeat.dev'
    ],
    DEFAULT_ALLOWED_METHODS: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
      'HEAD',
      'OPTIONS'
    ] as const,
    DEFAULT_ALLOWED_HEADERS: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
      'X-Api-Key',
      'X-Workspace-Id'
    ],
    DEFAULT_EXPOSED_HEADERS: [
      'X-Total-Count',
      'X-Page',
      'X-Per-Page',
      'X-Rate-Limit-Remaining',
      'X-Rate-Limit-Reset'
    ],
    DEFAULT_MAX_AGE: 86400 // 24 hours
  } as const;
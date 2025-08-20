import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fp from 'fastify-plugin';
import { CORS_CONFIG } from '../constants/cors';

async function corsPlugin(fastify: FastifyInstance) {
  // Get allowed origins from environment or use defaults
  const getAllowedOrigins = () => {
    if (process.env.ALLOWED_ORIGINS) {
      return process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
    }
    return [...CORS_CONFIG.DEFAULT_ALLOWED_ORIGINS];
  };


  // CORS configuration using simple origin array or function
  const corsOptions = {
    // Allow credentials (cookies, authorization headers, etc.)
    credentials: true,
    
    // Use dynamic origin checking in development, static in production
    origin: getAllowedOrigins(),
    
    // HTTP methods allowed for CORS
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    
    // How long the browser can cache preflight requests (in seconds)
    maxAge: 86400 // 24 hours
  };

  await fastify.register(fastifyCors, corsOptions);

  // Log CORS configuration in development
  if (process.env.NODE_ENV === 'development') {
    fastify.log.info('CORS plugin registered with development configuration');
  }
}

// Export as a plugin
export default fp(corsPlugin, {
  name: 'cors-plugin',
  dependencies: []
});
import fp from 'fastify-plugin'
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'
import { supabase } from '../../lib/supabase'

export interface AuthUser {
  id: string
  email?: string
  role?: string
  app_metadata?: Record<string, any>
  user_metadata?: Record<string, any>
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    supabase: typeof supabase
  }
  interface FastifyRequest {
    user?: AuthUser
  }
}

const auth: FastifyPluginAsync = async (fastify) => {
  // Decorate the fastify instance with supabase client
  fastify.decorate('supabase', supabase)

  // Authentication decorator
  fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const authorization = request.headers.authorization
      
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return reply.code(401).send({ error: 'Missing or invalid authorization header' })
      }

      const token = authorization.substring(7) // Remove 'Bearer ' prefix
      
      if (!token) {
        return reply.code(401).send({ error: 'No token provided' })
      }

      // Verify the JWT token with Supabase
      const { data: { user }, error } = await supabase.auth.getUser(token)
      
      if (error || !user) {
        return reply.code(401).send({ error: 'Invalid or expired token' })
      }

      // Attach user to request
      request.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        app_metadata: user.app_metadata,
        user_metadata: user.user_metadata
      }
    } catch (error) {
      fastify.log.error('Authentication error')
      return reply.code(401).send({ error: 'Authentication failed' })
    }
  })
}

export default fp(auth, {
  name: 'auth'
})
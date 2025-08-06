import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

// Zod schema for health check response
const HealthResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    status: z.literal('healthy'),
    timestamp: z.string().datetime(),
    environment: z.string(),
    swagger: z.string()
  })
});

const health: FastifyPluginAsync = async (fastify): Promise<void> => {
  // GET /health - Health check endpoint with Zod validation
  fastify.withTypeProvider<ZodTypeProvider>().get('/', {
    schema: {
      tags: ['Health'],
      summary: 'Health check',
      description: 'Check if the API is running and healthy',
      response: {
        200: HealthResponseSchema
      }
    }
  }, async (request, reply) => {
    const swaggerUrl = process.env.NODE_ENV === 'development' 
      ? `http://${request.hostname}/docs` 
      : 'Not available in production'

    reply.send({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        swagger: swaggerUrl
      }
    })
  })
}

export default health
import { FastifyPluginAsync } from 'fastify'

const health: FastifyPluginAsync = async (fastify): Promise<void> => {
  // GET /health - Health check endpoint
  fastify.get('/', {
    schema: {
      tags: ['Health'],
      summary: 'Health check',
      description: 'Check if the API is running and healthy',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                status: { type: 'string', example: 'healthy' },
                timestamp: { type: 'string', format: 'date-time' },
                environment: { type: 'string' },
                swagger: { type: 'string' }
              }
            }
          }
        }
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
import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'

const swaggerPlugin: FastifyPluginAsync = async (fastify) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  await fastify.register(import('@fastify/swagger'), {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'BeeAt Learning Platform API',
        description: 'API documentation for the BeeAt automation testing learning platform',
        version: '1.0.0',
        contact: {
          name: 'BeeAt Team',
          email: 'support@beeat.com'
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Supabase JWT token'
          }
        },
        schemas: {
          // Common response schemas
          SuccessResponse: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'object' },
              message: { type: 'string' }
            },
            required: ['success', 'data']
          },
          ErrorResponse: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: false },
              error: {
                type: 'object',
                properties: {
                  code: { type: 'string' },
                  message: { type: 'string' },
                  details: { type: 'object' }
                },
                required: ['code', 'message']
              }
            },
            required: ['success', 'error']
          },
          Pagination: {
            type: 'object',
            properties: {
              currentPage: { type: 'integer', example: 1 },
              totalPages: { type: 'integer', example: 10 },
              totalItems: { type: 'integer', example: 100 },
              hasNext: { type: 'boolean', example: true },
              hasPrev: { type: 'boolean', example: false }
            },
            required: ['currentPage', 'totalPages', 'totalItems', 'hasNext', 'hasPrev']
          },
          // Entity schemas
          Course: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              title: { type: 'string' },
              description: { type: 'string' },
              longDescription: { type: 'string' },
              thumbnail: { type: 'string', format: 'uri' },
              price: { type: 'number' },
              originalPrice: { type: 'number', nullable: true },
              rating: { type: 'number', minimum: 0, maximum: 5 },
              studentsCount: { type: 'integer' },
              duration: { type: 'string' },
              level: { type: 'string', enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] },
              category: { type: 'string' },
              language: { type: 'string' },
              lastUpdated: { type: 'string', format: 'date-time' },
              instructor: { $ref: '#/components/schemas/Instructor' },
              skills: { type: 'array', items: { type: 'string' } },
              requirements: { type: 'array', items: { type: 'string' } },
              isEnrolled: { type: 'boolean' }
            }
          },
          Instructor: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              bio: { type: 'string' },
              avatar: { type: 'string', format: 'uri' },
              rating: { type: 'number', minimum: 0, maximum: 5 },
              studentsCount: { type: 'integer' }
            }
          },
          User: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              email: { type: 'string', format: 'email' },
              fullName: { type: 'string' },
              phone: { type: 'string', nullable: true },
              bio: { type: 'string', nullable: true },
              avatar: { type: 'string', format: 'uri', nullable: true },
              createdAt: { type: 'string', format: 'date-time' },
              lastLoginAt: { type: 'string', format: 'date-time', nullable: true }
            }
          },
          CartItem: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              courseId: { type: 'string', format: 'uuid' },
              course: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  title: { type: 'string' },
                  instructor: { type: 'string' },
                  thumbnail: { type: 'string', format: 'uri' },
                  price: { type: 'number' },
                  originalPrice: { type: 'number', nullable: true }
                }
              },
              quantity: { type: 'integer', minimum: 1 },
              addedAt: { type: 'string', format: 'date-time' }
            }
          },
          Payment: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              amount: { type: 'number' },
              currency: { type: 'string' },
              status: { type: 'string', enum: ['PENDING', 'SUCCEEDED', 'FAILED', 'CANCELLED'] },
              paymentMethod: { type: 'string' },
              courses: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    title: { type: 'string' },
                    price: { type: 'number' }
                  }
                }
              },
              createdAt: { type: 'string', format: 'date-time' },
              paidAt: { type: 'string', format: 'date-time', nullable: true }
            }
          }
        }
      },
      tags: [
        { name: 'Courses', description: 'Course management endpoints' },
        { name: 'User', description: 'User profile endpoints' },
        { name: 'Cart', description: 'Shopping cart endpoints' },
        { name: 'Payment', description: 'Payment processing endpoints' },
        { name: 'Progress', description: 'Learning progress endpoints' },
        { name: 'Analytics', description: 'Analytics tracking endpoints' },
        { name: 'Search', description: 'Search and discovery endpoints' }
      ]
    }
  })

  await fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next()
      },
      preHandler: function (request, reply, next) {
        next()
      }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject
    },
    transformSpecificationClone: true
  })
}

export default fp(swaggerPlugin)
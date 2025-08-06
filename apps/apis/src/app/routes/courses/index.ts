import { FastifyPluginAsync } from 'fastify'
import { requireAuth, AuthenticatedRequest } from '../../../lib/auth'
import { CourseService } from '../../../services/course.service'

const courseService = new CourseService()

const courses: FastifyPluginAsync = async (fastify): Promise<void> => {
  // GET /courses - Get all courses with pagination and filters
  fastify.get('/', {
    schema: {
      tags: ['Courses'],
      summary: 'Get all courses',
      description: 'Retrieve all available courses with pagination and filtering options',
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1, default: 1 },
          limit: { type: 'integer', minimum: 1, maximum: 50, default: 12 },
          category: { type: 'string' },
          level: { type: 'string', enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] },
          sortBy: { type: 'string', enum: ['newest', 'popular', 'rating', 'price'], default: 'newest' },
          sortOrder: { type: 'string', enum: ['asc', 'desc'], default: 'desc' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                courses: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Course' }
                },
                pagination: { $ref: '#/components/schemas/Pagination' }
              }
            }
          }
        },
        500: { $ref: '#/components/schemas/ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    try {
      const query = request.query as {
        page?: string
        limit?: string
        category?: string
        level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
        sortBy?: 'newest' | 'popular' | 'rating' | 'price'
        sortOrder?: 'asc' | 'desc'
      }

      const result = await courseService.getCourses({
        page: query.page ? parseInt(query.page) : 1,
        limit: query.limit ? parseInt(query.limit) : 12,
        category: query.category,
        level: query.level,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder
      })

      reply.send({
        success: true,
        data: result
      })
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: {
          code: 'SYSTEM_001',
          message: 'Internal server error'
        }
      })
    }
  })

  // GET /courses/:courseId - Get course by ID
  fastify.get<{ Params: { courseId: string } }>('/:courseId', {
    schema: {
      tags: ['Courses'],
      summary: 'Get course by ID',
      description: 'Get detailed information about a specific course',
      params: {
        type: 'object',
        properties: {
          courseId: { type: 'string', format: 'uuid' }
        },
        required: ['courseId']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                course: { $ref: '#/components/schemas/Course' }
              }
            }
          }
        },
        404: { $ref: '#/components/schemas/ErrorResponse' },
        500: { $ref: '#/components/schemas/ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    try {
      const { courseId } = request.params
      const authHeader = request.headers.authorization
      let userId: string | undefined

      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7)
        try {
          const { data: { user } } = await fastify.supabase.auth.getUser(token)
          userId = user?.id
        } catch (error) {
          // Continue without user context
        }
      }

      const course = await courseService.getCourseById(courseId, userId)

      if (!course) {
        return reply.code(404).send({
          success: false,
          error: {
            code: 'COURSE_001',
            message: 'Course not found'
          }
        })
      }

      reply.send({
        success: true,
        data: { course }
      })
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: {
          code: 'SYSTEM_001',
          message: 'Internal server error'
        }
      })
    }
  })

  // GET /courses/enrolled - Get user's enrolled courses
  fastify.get('/enrolled', { 
    preHandler: requireAuth() 
  }, async (request: AuthenticatedRequest, reply) => {
    try {
      const query = request.query as {
        status?: string
        page?: string
        limit?: string
      }

      const result = await courseService.getEnrolledCourses(
        request.user.id,
        query.status
      )

      reply.send({
        success: true,
        data: result
      })
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: {
          code: 'SYSTEM_001',
          message: 'Internal server error'
        }
      })
    }
  })

  // POST /courses/:courseId/enroll - Enroll in a course
  fastify.post<{ Params: { courseId: string } }>('/:courseId/enroll', {
    schema: {
      tags: ['Courses'],
      summary: 'Enroll in a course',
      description: 'Enroll the authenticated user in a specific course',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          courseId: { type: 'string', format: 'uuid' }
        },
        required: ['courseId']
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                enrollment: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    courseId: { type: 'string', format: 'uuid' },
                    userId: { type: 'string', format: 'uuid' },
                    enrolledAt: { type: 'string', format: 'date-time' },
                    progress: { type: 'integer', example: 0 }
                  }
                }
              }
            }
          }
        },
        401: { $ref: '#/components/schemas/ErrorResponse' },
        409: { $ref: '#/components/schemas/ErrorResponse' },
        500: { $ref: '#/components/schemas/ErrorResponse' }
      }
    },
    preHandler: requireAuth()
  }, async (request: AuthenticatedRequest, reply) => {
    try {
      const { courseId } = request.params

      const enrollment = await courseService.enrollUserInCourse(
        request.user.id,
        courseId
      )

      reply.code(201).send({
        success: true,
        data: {
          message: 'Successfully enrolled in course',
          enrollment: {
            id: enrollment.id,
            courseId: enrollment.courseId,
            userId: enrollment.userId,
            enrolledAt: enrollment.enrolledAt,
            progress: 0
          }
        }
      })
    } catch (error) {
      if (error instanceof Error && error.message === 'COURSE_003') {
        return reply.code(409).send({
          success: false,
          error: {
            code: 'COURSE_003',
            message: 'Already enrolled in this course'
          }
        })
      }

      reply.code(500).send({
        success: false,
        error: {
          code: 'SYSTEM_001',
          message: 'Internal server error'
        }
      })
    }
  })
}

export default courses
import { FastifyPluginAsync } from 'fastify'
import { requireAuth, AuthenticatedRequest } from '../../../lib/auth'
import { AnalyticsService } from '../../../services/analytics.service'

const analyticsService = new AnalyticsService()

const analytics: FastifyPluginAsync = async (fastify): Promise<void> => {
  // POST /analytics/course-view - Track course view
  fastify.post<{
    Body: {
      courseId: string
      source?: string
      referrer?: string
    }
  }>('/course-view', async (request, reply) => {
    try {
      const { courseId, source, referrer } = request.body
      const authHeader = request.headers.authorization
      let userId: string | null = null

      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7)
        try {
          const { data: { user } } = await fastify.supabase.auth.getUser(token)
          userId = user?.id || null
        } catch (error) {
          // Continue without user context
        }
      }

      if (!courseId) {
        return reply.code(400).send({
          success: false,
          error: {
            code: 'VALIDATION_001',
            message: 'Course ID is required'
          }
        })
      }

      const ipAddress = request.ip
      
      const result = await analyticsService.trackCourseView(userId, {
        courseId,
        source,
        referrer,
        ipAddress
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

  // POST /analytics/lesson-completion - Track lesson completion
  fastify.post<{
    Body: {
      courseId: string
      lessonId: string
      timeSpent: number
      completionRate: number
    }
  }>('/lesson-completion', {
    preHandler: requireAuth()
  }, async (request, reply) => {
    const authRequest = request as AuthenticatedRequest
    try {
      const { courseId, lessonId, timeSpent, completionRate } = request.body as any

      if (!courseId || !lessonId || typeof timeSpent !== 'number') {
        return reply.code(400).send({
          success: false,
          error: {
            code: 'VALIDATION_001',
            message: 'Course ID, lesson ID, and time spent are required'
          }
        })
      }

      const result = await analyticsService.trackLessonCompletion(authRequest.user.id, {
        courseId,
        lessonId,
        timeSpent,
        completionRate
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

  // GET /analytics/learning - Get learning analytics
  fastify.get<{
    Querystring: {
      period?: string
    }
  }>('/learning', {
    preHandler: requireAuth()
  }, async (request, reply) => {
    const authRequest = request as AuthenticatedRequest
    try {
      const query = request.query as any
      const period = query.period || 'month'

      const result = await analyticsService.getLearningAnalytics(
        authRequest.user.id,
        period
      )

      reply.send({
        success: true,
        data: result
      })
    } catch (error) {
      if (error instanceof Error && error.message === 'User not found') {
        return reply.code(404).send({
          success: false,
          error: {
            code: 'USER_001',
            message: 'User not found'
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

export default analytics
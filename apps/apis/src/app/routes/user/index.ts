import { FastifyPluginAsync } from 'fastify'
import { requireAuth, AuthenticatedRequest } from '../../../lib/auth'
import { UserService } from '../../../services/user.service'

const userService = new UserService()

const user: FastifyPluginAsync = async (fastify): Promise<void> => {
  // GET /user/profile - Get user profile
  fastify.get('/profile', {
    preHandler: requireAuth()
  }, async (request, reply) => {
    const authRequest = request as AuthenticatedRequest
    try {
      const profile = await userService.getUserProfile(authRequest.user.id)

      if (!profile) {
        return reply.code(404).send({
          success: false,
          error: {
            code: 'USER_001',
            message: 'User profile not found'
          }
        })
      }

      reply.send({
        success: true,
        data: profile
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

  // PUT /user/profile - Update user profile
  fastify.put<{
    Body: {
      fullName?: string
      phone?: string
      bio?: string
      preferences?: {
        language?: string
        timezone?: string
        notifications?: {
          email?: boolean
          courseUpdates?: boolean
          promotions?: boolean
          weeklyDigest?: boolean
        }
      }
    }
  }>('/profile', {
    preHandler: requireAuth()
  }, async (request, reply) => {
    const authRequest = request as AuthenticatedRequest
    try {
      const result = await userService.updateUserProfile(
        authRequest.user.id,
        request.body as any
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

  // POST /user/avatar - Upload user avatar
  fastify.post('/avatar', {
    preHandler: requireAuth()
  }, async (request, reply) => {
    const authRequest = request as AuthenticatedRequest
    try {
      // This would typically handle file upload to Supabase Storage
      // For now, returning a placeholder implementation
      
      const avatarUrl = 'https://example.com/avatar.jpg' // Placeholder

      const result = await userService.updateAvatar(authRequest.user.id, avatarUrl)

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

  // PUT /user/password - Change password
  fastify.put<{
    Body: {
      currentPassword: string
      newPassword: string
      confirmPassword: string
    }
  }>('/password', {
    preHandler: requireAuth()
  }, async (request, reply) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = request.body as {
        currentPassword: string
        newPassword: string
        confirmPassword: string
      }

      if (!currentPassword || !newPassword || !confirmPassword) {
        return reply.code(400).send({
          success: false,
          error: {
            code: 'VALIDATION_001',
            message: 'All password fields are required'
          }
        })
      }

      if (newPassword !== confirmPassword) {
        return reply.code(400).send({
          success: false,
          error: {
            code: 'VALIDATION_002',
            message: 'New passwords do not match'
          }
        })
      }

      if (newPassword.length < 6) {
        return reply.code(400).send({
          success: false,
          error: {
            code: 'AUTH_006',
            message: 'Password must be at least 6 characters long'
          }
        })
      }
      
      const { error } = await fastify.supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        return reply.code(400).send({
          success: false,
          error: {
            code: 'AUTH_001',
            message: 'Failed to update password'
          }
        })
      }

      reply.send({
        success: true,
        data: {
          message: 'Password changed successfully'
        }
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
}

export default user
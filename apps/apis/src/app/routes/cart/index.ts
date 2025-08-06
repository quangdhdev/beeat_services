import { FastifyPluginAsync } from 'fastify'
import { requireAuth, AuthenticatedRequest } from '../../../lib/auth'
import { CartService } from '../../../services/cart.service'

const cartService = new CartService()

const cart: FastifyPluginAsync = async (fastify): Promise<void> => {
  // GET /cart - Get cart items
  fastify.get('/', {
    schema: {
      tags: ['Cart'],
      summary: 'Get cart items',
      description: 'Get all items in the authenticated user\'s shopping cart',
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                items: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/CartItem' }
                },
                summary: {
                  type: 'object',
                  properties: {
                    totalItems: { type: 'integer' },
                    subtotal: { type: 'number' },
                    totalOriginalPrice: { type: 'number' },
                    totalSavings: { type: 'number' },
                    total: { type: 'number' }
                  }
                }
              }
            }
          }
        },
        401: { $ref: '#/components/schemas/ErrorResponse' },
        500: { $ref: '#/components/schemas/ErrorResponse' }
      }
    },
    preHandler: requireAuth()
  }, async (request: AuthenticatedRequest, reply) => {
    try {
      const result = await cartService.getCartItems(request.user.id)

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

  // POST /cart/add - Add course to cart
  fastify.post<{
    Body: {
      courseId: string
      quantity?: number
    }
  }>('/add', {
    schema: {
      tags: ['Cart'],
      summary: 'Add course to cart',
      description: 'Add a course to the authenticated user\'s shopping cart',
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          courseId: { type: 'string', format: 'uuid' },
          quantity: { type: 'integer', minimum: 1, default: 1 }
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
                cartItem: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    courseId: { type: 'string', format: 'uuid' },
                    quantity: { type: 'integer' },
                    addedAt: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        },
        400: { $ref: '#/components/schemas/ErrorResponse' },
        401: { $ref: '#/components/schemas/ErrorResponse' },
        409: { $ref: '#/components/schemas/ErrorResponse' },
        500: { $ref: '#/components/schemas/ErrorResponse' }
      }
    },
    preHandler: requireAuth()
  }, async (request: AuthenticatedRequest, reply) => {
    try {
      const { courseId, quantity = 1 } = request.body

      if (!courseId) {
        return reply.code(400).send({
          success: false,
          error: {
            code: 'VALIDATION_001',
            message: 'Course ID is required'
          }
        })
      }

      const result = await cartService.addToCart(
        request.user.id,
        courseId,
        quantity
      )

      reply.code(201).send({
        success: true,
        data: result
      })
    } catch (error) {
      if (error instanceof Error && error.message === 'Course already in cart') {
        return reply.code(409).send({
          success: false,
          error: {
            code: 'CART_001',
            message: 'Course already in cart'
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

  // PUT /cart/items/:itemId - Update cart item quantity
  fastify.put<{
    Params: { itemId: string }
    Body: { quantity: number }
  }>('/items/:itemId', {
    preHandler: requireAuth()
  }, async (request: AuthenticatedRequest, reply) => {
    try {
      const { itemId } = request.params
      const { quantity } = request.body

      if (!quantity || quantity < 1) {
        return reply.code(400).send({
          success: false,
          error: {
            code: 'VALIDATION_001',
            message: 'Quantity must be at least 1'
          }
        })
      }

      const result = await cartService.updateCartItemQuantity(
        request.user.id,
        itemId,
        quantity
      )

      reply.send({
        success: true,
        data: result
      })
    } catch (error) {
      if (error instanceof Error && error.message === 'Cart item not found') {
        return reply.code(404).send({
          success: false,
          error: {
            code: 'CART_002',
            message: 'Cart item not found'
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

  // DELETE /cart/items/:itemId - Remove item from cart
  fastify.delete<{
    Params: { itemId: string }
  }>('/items/:itemId', {
    preHandler: requireAuth()
  }, async (request: AuthenticatedRequest, reply) => {
    try {
      const { itemId } = request.params

      const result = await cartService.removeFromCart(
        request.user.id,
        itemId
      )

      reply.send({
        success: true,
        data: result
      })
    } catch (error) {
      if (error instanceof Error && error.message === 'Cart item not found') {
        return reply.code(404).send({
          success: false,
          error: {
            code: 'CART_002',
            message: 'Cart item not found'
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

  // DELETE /cart/clear - Clear cart
  fastify.delete('/clear', {
    preHandler: requireAuth()
  }, async (request: AuthenticatedRequest, reply) => {
    try {
      const result = await cartService.clearCart(request.user.id)

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
}

export default cart
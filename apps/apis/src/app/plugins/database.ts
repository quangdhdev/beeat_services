import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../../lib/database'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: typeof prisma
  }
}

const databasePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate('prisma', prisma)

  fastify.addHook('onClose', async () => {
    await prisma.$disconnect()
  })
}

export default fp(databasePlugin)
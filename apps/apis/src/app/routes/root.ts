import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const RootResponseSchema = z.object({
  message: z.string()
});

export default async function (fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get('/', {
    schema: {
      tags: ['Root'],
      summary: 'API Root',
      description: 'API welcome message',
      response: {
        200: RootResponseSchema
      }
    }
  }, async function () {
    return { message: 'Hello API' };
  });
}

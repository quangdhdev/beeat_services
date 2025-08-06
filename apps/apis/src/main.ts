import Fastify from 'fastify';
import { app } from './app/app';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';

// Configure Pino logger
const loggerConfig = isDevelopment
  ? {
      level: 'debug',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    }
  : {
      level: 'info',
      formatters: {
        level: (label: string) => {
          return { level: label.toUpperCase() };
        },
      },
      timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
    };

// Instantiate Fastify with Pino logger config
const server = Fastify({
  logger: loggerConfig,
});

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});

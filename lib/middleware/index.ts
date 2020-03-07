import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyHelmet from 'fastify-helmet';
import fastifyCors from 'fastify-cors';
import fastifyJwt from 'fastify-jwt';
// import fastifySwagger from 'fastify-swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';
import config from '../config';

/**
 * Takes in a server instance and registers
 * the respective middlewares
 * @param {FastifyInstance} server The instance of fastify
 */
const registerMiddlewares: (
	server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => void = (server: FastifyInstance) => {
	server.register(fastifyCompress, {
		global: true,
	});
	server.register(fastifyHelmet, {
		hidePoweredBy: {
			setTo: 'PHP 4.2.0',
		},
		contentSecurityPolicy: {
			browserSniff: false,
			disableAndroid: true,
			directives: {
				'default-src': ["'self'"],
			},
		},
		ieNoOpen: true,
		xssFilter: true,
	});
	server.register(fastifyCors, {
		credentials: true,
	});
	server.register(fastifyJwt, {
		secret: config.secret,
		decode: {
			complete: true,
			json: true,
		},
	});
	server.decorate(
		'authenticate',
		async (request: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
			try {
				await request.jwtVerify();
			} catch (error) {
				reply.send({ error });
			}
		},
	);
};

export { registerMiddlewares };

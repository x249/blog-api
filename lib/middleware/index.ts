import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyHelmet from 'fastify-helmet';
import fastifyCors from 'fastify-cors';
import fastifyJwt from 'fastify-jwt';
// import fastifySwagger from 'fastify-swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';
import config from '../config';

const registerMiddlewares: (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => void = (fastify: FastifyInstance) => {
	fastify.register(fastifyCompress, {
		global: true,
	});
	fastify.register(fastifyHelmet, {
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
	fastify.register(fastifyCors, {
		credentials: true,
	});
	fastify.register(fastifyJwt, {
		secret: config.secret,
		decode: {
			complete: true,
			json: true,
		},
	});
	fastify.decorate(
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

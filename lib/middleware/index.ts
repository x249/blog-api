import { FastifyInstance } from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyHelmet from 'fastify-helmet';
import fastifyCors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';

/**
 * Takes in a server instance and registers
 * the respective middlewares
 * @param {FastifyInstance} server The instance of fastify
 */
const registerMiddlewares: (
	server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => void = (server: FastifyInstance) => {
	server.register(fastifySwagger, {
		routePrefix: '/docs',
		swagger: {
			info: {
				title: 'Blog API',
				description: 'Swagger spec for the Technohexia Blog API',
				version: '1.0.0',
			},
			externalDocs: {
				url: 'https://swagger.io',
				description: 'Find more info here',
			},
			host: 'localhost:3000',
			schemes: ['http', 'https', 'http/2'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [{ name: 'user', description: 'User related end-points' }],
			definitions: {
				User: {
					$id: 'User',
					type: 'object',
					required: ['id', 'fullName', 'email', 'password'],
					properties: {
						id: { type: 'integer' },
						firstName: { type: 'string', nullable: false },
						email: { type: 'string', format: 'email' },
						password: { type: 'string', nullable: true },
						createdAt: { type: 'string', nullable: true },
						updatedAt: { type: 'string', nullable: true },
					},
				},
			},
		},
		exposeRoute: true,
	});
	server.register(fastifyCompress, {
		global: true,
		threshold: 5,
	});
	server.register(fastifyHelmet, {
		referrerPolicy: {
			policy: 'same-origin',
		},
		hidePoweredBy: {
			setTo: 'PHP 4.2.0',
		},
		// TODO: refactor to use swagger + CSP
		// contentSecurityPolicy: {
		// 	browserSniff: false,
		// 	disableAndroid: true,
		// 	directives: {
		// 		'default-src': ["'self'"],
		// 	},
		// },
		permittedCrossDomainPolicies: {
			permittedPolicies: 'master-only',
		},
		ieNoOpen: true,
		xssFilter: {
			setOnOldIE: true,
		},
	});
	server.register(fastifyCors, {
		credentials: true,
		origin: true,
	});
};

export { registerMiddlewares };

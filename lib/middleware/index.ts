import { FastifyInstance } from 'fastify';
import fastifyHelmet from 'fastify-helmet';
import fastifyCors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import fastifyMetrics from 'fastify-metrics';
import underPressure from 'under-pressure';
import { Server, IncomingMessage, ServerResponse } from 'http';
import config from '../config';
import { db } from '../db';

/**
 * Takes in a server instance and registers
 * the respective middlewares
 * @param {FastifyInstance} server The instance of fastify
 */
const registerMiddlewares: (
	server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => void = (server: FastifyInstance) => {
	config.isProduction &&
		server.register(fastifyMetrics, {
			endpoint: '/metrics',
			enableDefaultMetrics: true,
		});
	server.register(underPressure, {
		maxEventLoopDelay: config.isProduction ? 1000 : Infinity,
		maxHeapUsedBytes: config.isProduction ? 100000000 : Infinity,
		maxRssBytes: config.isProduction ? 100000000 : Infinity,
		retryAfter: 50,
		exposeStatusRoute: {
			routeOpts: {
				logLevel: config.logger.level,
			},
			url: '/alive',
		},
		healthCheck: async () => {
			try {
				const result = await db.raw('select 1+1 as result');
				if (result) return true;

				return false;
			} catch (error) {
				server.log.error(error);
				return false;
			}
		},
		healthCheckInterval: 500,
	});
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
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		credentials: false,
		preflightContinue: false,
		maxAge: 86400,
		origin: [
			/^https?:\/\/admin\.technohexia\.com\/?[\s]$/,
			/^https?:\/\/.*\.technohexia\.com\/?[\s]$/,
			/^https?:\/\/localhost(?:\:[0-9]{1,4})?\/[\s]?$/,
		],
	});
};

export { registerMiddlewares };

import fastify from 'fastify';
import { applyRoutes } from './utils';
import { registerMiddlewares } from './middleware';
import routes from './routes';
import config from './config';

const server = fastify({
	logger: {
		name: 'blog-api',
		enabled: !config.logger.disabled,
		timestamp: true,
		level: config.logger.level,
		prettyPrint: true,
	},
});

registerMiddlewares(server);
applyRoutes(server, routes);

export default server;

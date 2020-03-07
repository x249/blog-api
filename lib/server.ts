import fastify from 'fastify';
import { applyRoutes, errors } from './utils';
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
	trustProxy: true,
});

registerMiddlewares(server);
applyRoutes(server, routes);
errors.handleErrors(server);

server.ready(error => {
	if (error) {
		server.log.error(error);
		process.exit(345);
	}
});

export default server;

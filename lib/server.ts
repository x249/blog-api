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
	bodyLimit: 8 * 1024,
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
	config.isDev && server.log.info(`\n${server.printRoutes()}`);
});

export default server;

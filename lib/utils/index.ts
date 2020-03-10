import { RoutesApplier } from '../types/utils';
import * as errors from './errors';

/**
 * Takes an array with routes and applies
 * them on the server
 * @param {FastifyInstance} server The fastify server instance
 * @param {any[]} routes The routes to be applied
 */
// eslint-disable-next-line
const applyRoutes: RoutesApplier = (server, routes) => {
	routes.forEach(route => server.route(route));
};

export { applyRoutes, errors };

import { RoutesApplier } from '../types/utils';
import * as errors from './errors';

/**
 * Takes an array with routes and applies
 * them on the server
 */
// eslint-disable-next-line
const applyRoutes: RoutesApplier = (server, routes) => {
	routes.forEach(route => server.route(route));
};

export { applyRoutes, errors };

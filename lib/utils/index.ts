import { FastifyInstance } from 'fastify';
import { RoutesApplier } from '../types/utils';
import errors from './errors';

/**
 * Takes an array with routes and applies
 * them on the server
 * @param {FastifyInstance} server The fastify server instance
 * @param {any[]} routes The routes to be applied
 */
// eslint-disable-next-line
export const applyRoutes = ((server: FastifyInstance, routes: any[]) => {
	routes.forEach(route => server.route(route));
}) as RoutesApplier;

export { errors };

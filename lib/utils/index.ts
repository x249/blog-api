import { FastifyInstance } from 'fastify';
import { RoutesApplier } from '../types/utils';
import errors from './errors';

// eslint-disable-next-line
export const applyRoutes = ((fastify: FastifyInstance, routes: any[]) => {
	routes.forEach(route => fastify.route(route));
}) as RoutesApplier;

export { errors };

import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

export type RoutesApplier = (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
	routes: any[],
) => void;

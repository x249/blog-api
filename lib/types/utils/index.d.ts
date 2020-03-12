import { FastifyInstance, RouteOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { HTTPClientError } from '../../utils/errors';
import { DBError } from 'db-errors';

export type RoutesApplier = (
	fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
	routes: RouteOptions[],
) => void;

export type APIError = Error | DBError | HTTPClientError;

export type ErrorHandler = (
	server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => FastifyInstance<Server, IncomingMessage, ServerResponse>;

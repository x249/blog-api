import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

export type RegisterMiddleware = (
	server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
) => void;

import {
	FastifyRequest,
	FastifyReply,
	DefaultQuery,
	DefaultParams,
	DefaultHeaders,
	DefaultBody,
} from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';

export type RouteHandler = (
	request: FastifyRequest<
		IncomingMessage,
		DefaultQuery,
		DefaultParams,
		DefaultHeaders,
		DefaultBody
	>,
	reply: FastifyReply<ServerResponse>,
) => void;

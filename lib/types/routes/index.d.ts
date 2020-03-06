import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';

export type RouteHandler = (
	request: FastifyRequest<
		IncomingMessage,
		fastify.DefaultQuery,
		fastify.DefaultParams,
		fastify.DefaultHeaders
	>,
	reply: FastifyReply<ServerResponse>,
) => void;

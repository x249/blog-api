import server from '../lib/server';
import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

describe('server tests', () => {
	let fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;

	beforeEach(() => {
		fastify = server;
	});

	test('should successfully do a health check', async (done: jest.DoneCallback) => {
		const response = await fastify.inject({
			method: 'GET',
			url: '/alive',
		});

		const parsedResponsePayload = JSON.parse(response.payload);

		expect(response.statusCode).toBe(200);
		expect(parsedResponsePayload).toStrictEqual({ status: 'ok' });
		done();
	});
});

import server from '../../../lib/server';
import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

describe('user routes tests', () => {
	let fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;
	const mockedUserPayload = {
		email: 'routes-test-user@testing.com',
		fullName: 'Routes Test User',
		password: 'mocked_password',
	};

	beforeEach(() => {
		fastify = server;
	});

	test('should successfully fetch all users', async (done: jest.DoneCallback) => {
		const response = await fastify.inject({
			method: 'GET',
			url: '/api/v1/users',
		});

		const parsedResponsePayload = JSON.parse(response.payload);

		expect(response.statusCode).toBe(200);
		expect(typeof parsedResponsePayload.users).toBe('object');
		done();
	});

	test('should successfully create a new user', async (done: jest.DoneCallback) => {
		const response = await fastify.inject({
			method: 'POST',
			url: '/api/v1/user/new',
			payload: {
				...mockedUserPayload,
			},
		});

		const parsedResponsePayload = JSON.parse(response.payload);

		expect(response.statusCode).toBe(200);
		expect(parsedResponsePayload.user.email).toBe(mockedUserPayload.email);
		expect(parsedResponsePayload.user.fullName).toBe(
			mockedUserPayload.fullName,
		);
		done();
	});

	test('should successfully fetch a user using their id', async (done: jest.DoneCallback) => {
		try {
			const response = await fastify.inject({
				method: 'GET',
				url: '/api/v1/user/1',
			});

			const parsedResponsePayload = JSON.parse(response.payload);

			expect(response.statusCode).toBe(200);
			expect(parsedResponsePayload.user.id).toBe(1);
			expect(parsedResponsePayload.user.email).toBe(mockedUserPayload.email);
			expect(parsedResponsePayload.user.fullName).toBe(
				mockedUserPayload.fullName,
			);
			done();
		} catch (error) {
			expect(error.message).toBe('User not found!');
			expect(error.statusCode).toBe(404);
			done();
		}
	});

	test('should successfully authenticate a user using their credentials', async (done: jest.DoneCallback) => {
		try {
			const response = await fastify.inject({
				method: 'POST',
				url: '/api/v1/user/authenticate',
				payload: {
					email: mockedUserPayload.email,
					password: mockedUserPayload.password,
				},
			});

			const parsedResponsePayload = JSON.parse(response.payload);

			expect(response.statusCode).toBe(200);
			expect(parsedResponsePayload.user.id).toBe(1);
			expect(parsedResponsePayload.user.email).toBe(mockedUserPayload.email);
			expect(parsedResponsePayload.user.fullName).toBe(
				mockedUserPayload.fullName,
			);
			expect(typeof parsedResponsePayload.token).toBe('string');
			done();
		} catch (error) {
			expect(error.message).toBe('User not found!');
			expect(error.statusCode).toBe(404);
			done();
		}
	});

	test('should successfully update a user using their id', async (done: jest.DoneCallback) => {
		try {
			const response = await fastify.inject({
				method: 'PATCH',
				url: '/api/v1/user/1',
				payload: {
					fullName: 'Updated full name',
				},
			});

			const parsedResponsePayload = JSON.parse(response.payload);

			expect(response.statusCode).toBe(200);
			expect(parsedResponsePayload.user.fullName).toBe('Updated full name');
			done();
		} catch (error) {
			expect(error.message).toBe('User not found!');
			expect(error.statusCode).toBe(404);
			done();
		}
	});

	test('should successfully delete a user using their id', async (done: jest.DoneCallback) => {
		try {
			const response = await fastify.inject({
				method: 'DELETE',
				url: '/api/v1/user/1',
			});

			const parsedResponsePayload = JSON.parse(response.payload);

			console.log(parsedResponsePayload);
			expect(response.statusCode).toBe(200);
			done();
		} catch (error) {
			expect(error.message).toBe('User not found!');
			expect(error.statusCode).toBe(404);
			done();
		}
	});
});

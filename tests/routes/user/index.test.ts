import server from '../../../lib/server';
import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { userController } from '../../../lib/controllers';

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

		expect(response.statusCode).toEqual(200);
		expect(typeof parsedResponsePayload.users).toEqual('object');
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

		expect(response.statusCode).toEqual(200);
		expect(parsedResponsePayload.user.email).toEqual(mockedUserPayload.email);
		expect(parsedResponsePayload.user.fullName).toEqual(
			mockedUserPayload.fullName,
		);
		done();
	});

	test('should successfully fetch a user using their id', async (done: jest.DoneCallback) => {
		const createUserPayload = await userController.createUser({
			email: 'create-temp-user@testing.co',
			fullName: 'Create Temp User',
			password: 'temp_user_p@ssw0rd',
		});

		const response = await fastify.inject({
			method: 'GET',
			url: `/api/v1/user/${createUserPayload.user.id}`,
		});

		const parsedResponsePayload = JSON.parse(response.payload);

		expect(response.statusCode).toEqual(200);
		expect(parsedResponsePayload.user.email).toEqual(
			createUserPayload.user.email,
		);
		expect(parsedResponsePayload.user.fullName).toEqual(
			createUserPayload.user.fullName,
		);
		done();
	});

	test('should successfully authenticate a user using their credentials', async (done: jest.DoneCallback) => {
		const response = await fastify.inject({
			method: 'POST',
			url: '/api/v1/user/authenticate',
			payload: {
				email: mockedUserPayload.email,
				password: mockedUserPayload.password,
			},
		});

		const parsedResponsePayload = JSON.parse(response.payload);

		expect(response.statusCode).toEqual(200);
		expect(parsedResponsePayload.user.email).toEqual(mockedUserPayload.email);
		expect(parsedResponsePayload.user.fullName).toEqual(
			mockedUserPayload.fullName,
		);
		expect(typeof parsedResponsePayload.token).toEqual('string');
		done();
	});

	test('should successfully update a user using their id', async (done: jest.DoneCallback) => {
		const updateUserPayload = await userController.createUser({
			email: 'update-temp-user@testing.co',
			fullName: 'Update Temp User',
			password: 'temp_user_p@ssw0rd',
		});

		const response = await fastify.inject({
			method: 'PATCH',
			url: `/api/v1/user/${updateUserPayload.user.id}`,
			payload: {
				fullName: 'Updated full name',
			},
		});

		const parsedResponsePayload = JSON.parse(response.payload);

		expect(response.statusCode).toEqual(200);
		expect(parsedResponsePayload.user.fullName).toEqual('Updated full name');
		done();
	});

	test('should successfully delete a user using their id', async (done: jest.DoneCallback) => {
		const deleteUserPayload = await userController.createUser({
			email: 'delete-temp-user@testing.co',
			fullName: 'Delete Temp User',
			password: 'temp_user_p@ssw0rd',
		});

		const response = await fastify.inject({
			method: 'DELETE',
			url: `/api/v1/user/${deleteUserPayload.user.id}`,
		});

		const parsedResponsePayload = JSON.parse(response.payload);

		expect(response.statusCode).toEqual(200);
		expect(parsedResponsePayload.user.email).toEqual(
			deleteUserPayload.user.email,
		);
		expect(parsedResponsePayload.user.fullName).toEqual(
			deleteUserPayload.user.fullName,
		);
		done();
	});
});

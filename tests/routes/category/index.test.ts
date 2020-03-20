import server from '../../../lib/server';
import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { categoryController } from '../../../lib/controllers';

describe('category routes tests', () => {
	let fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;
	const mockedCategoryPayload = {
		name: 'TestingCategory',
	};

	beforeEach(() => {
		fastify = server;
	});

	test('should successfully create a category', async (done: jest.DoneCallback) => {
		const response = await fastify.inject({
			method: 'POST',
			url: '/api/v1/category',
			payload: {
				name: mockedCategoryPayload.name,
			},
		});

		const parsedResponsePayload = JSON.parse(response.payload);

		expect(response.statusCode).toEqual(200);
		expect(parsedResponsePayload.createdCategory.name).toEqual(
			mockedCategoryPayload.name,
		);
		done();
	});

	test('should successfully fetch all categories', async (done: jest.DoneCallback) => {
		const response = await fastify.inject({
			method: 'GET',
			url: '/api/v1/categories',
		});

		const parsedResponsePayload = JSON.parse(response.payload);

		expect(typeof parsedResponsePayload.categories).toEqual('object');
		done();
	});

	test('should successfully fetch a category using its ID', async (done: jest.DoneCallback) => {
		const fetchCategoryPayload = await categoryController.createCategory({
			name: 'Fetch Controller Test Temp Category',
		});

		const response = await fastify.inject({
			method: 'GET',
			url: `/api/v1/category/${fetchCategoryPayload.id}`,
		});

		const parsedResponsePayload = JSON.parse(response.payload);

		expect(response.statusCode).toEqual(200);
		expect(parsedResponsePayload.category.name).toEqual(
			fetchCategoryPayload.name,
		);
		done();
	});
});

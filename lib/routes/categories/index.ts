import { RouteOptions } from 'fastify';
import { categoryController } from '../../controllers';
import { RouteHandler } from '../../types/routes';

export const categoryRoutes: RouteOptions[] = [
	{
		method: 'GET',
		url: '/api/v1/categories',
		handler: (async (request, reply) => {
			try {
				const categories = await categoryController.getAllCategories();

				reply.code(200).send({ categories });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'GET',
		url: '/api/v1/category/:id',
		handler: (async (request, reply) => {
			try {
				const category = await categoryController.getCategoryById({
					id: request.params.id,
				});

				reply.code(200).send({ category });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'POST',
		url: '/api/v1/category',
		handler: (async (request, reply) => {
			try {
				const createdCategory = await categoryController.createCategory(
					request.body,
				);

				reply.code(200).send({ createdCategory });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'PATCH',
		url: '/api/v1/category/:id',
		handler: (async (request, reply) => {
			try {
				const updatedCategory = await categoryController.updateCategoryById(
					request.params.id,
					request.body,
				);

				reply.code(200).send({ updatedCategory });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'DELETE',
		url: '/api/v1/category/:id',
		handler: (async (request, reply) => {
			try {
				const deletedCategory = await categoryController.deleteCategoryById({
					id: request.params.id,
				});

				reply.code(200).send({ deletedCategory });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
];

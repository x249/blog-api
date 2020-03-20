import { RouteOptions } from 'fastify';
import { articleController } from '../../controllers';
import { RouteHandler } from '../../types/routes';

export const articleRoutes: RouteOptions[] = [
	{
		method: 'GET',
		url: '/api/v1/articles',
		handler: (async (request, reply) => {
			try {
				const articles = await articleController.getAllArticles();

				reply.code(200).send({ articles });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'GET',
		url: '/api/v1/article/:id',
		handler: (async (request, reply) => {
			try {
				const article = await articleController.getArticleById({
					id: request.params.id,
				});

				reply.code(200).send({ article });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'POST',
		url: '/api/v1/article',
		handler: (async (request, reply) => {
			try {
				const createdArticle = await articleController.createArticle(
					request.body,
				);

				reply.code(200).send({ createdArticle });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'PATCH',
		url: '/api/v1/article/:id',
		handler: (async (request, reply) => {
			try {
				const updatedArticle = await articleController.updateArticle(
					request.params.id,
					request.body,
				);

				reply.code(200).send({ updatedArticle });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'DELETE',
		url: '/api/v1/article/:id',
		handler: (async (request, reply) => {
			try {
				const deletedArticle = await articleController.deleteArticle({
					id: request.params.id,
				});

				reply.code(200).send({ deletedArticle });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
];

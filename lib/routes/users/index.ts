import { RouteOptions } from 'fastify';
import { userController } from '../../controllers';
import { RouteHandler } from '../../types/routes';
import {
	getAllUsersSchema,
	getUserSchema,
	newUserSchema,
	authenticateUserSchema,
	updateUserSchema,
	deleteUserSchema,
} from './schema';

export const userRoutes: RouteOptions[] = [
	{
		method: 'GET',
		url: '/api/v1/users',
		schema: getAllUsersSchema,
		handler: (async (request, reply) => {
			try {
				const users = await userController.getAllUsers();

				reply.code(200).send({ users });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ ...error });
			}
		}) as RouteHandler,
	},
	{
		method: 'GET',
		url: '/api/v1/user/:id',
		schema: getUserSchema,
		handler: (async (request, reply) => {
			try {
				const user = await userController.getUserById({
					id: request.params.id,
				});

				reply.code(200).send({
					user,
				});
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'POST',
		url: '/api/v1/user/new',
		schema: newUserSchema,
		handler: (async (request, reply) => {
			try {
				const newUserPayload = await userController.createUser(request.body);

				reply.code(200).send(newUserPayload);
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'POST',
		url: '/api/v1/user/authenticate',
		schema: authenticateUserSchema,
		handler: (async (request, reply) => {
			try {
				const authenticateUserPayload = await userController.authenticateUser(
					request.body,
				);

				reply.code(200).send(authenticateUserPayload);
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'PATCH',
		url: '/api/v1/user/:id',
		schema: updateUserSchema,
		handler: (async (request, reply) => {
			try {
				const updatedUser = await userController.updateUserById(
					request.params.id,
					request.body,
				);

				reply.code(200).send({ user: updatedUser });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
	{
		method: 'DELETE',
		url: '/api/v1/user/:id',
		schema: deleteUserSchema,
		handler: (async (request, reply) => {
			try {
				const deletedUser = await userController.deleteUserById(
					request.params.id,
				);

				reply.code(200).send({ user: deletedUser });
			} catch (error) {
				reply.code(error.statusCode || 500).send({ error });
			}
		}) as RouteHandler,
	},
];

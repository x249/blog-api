import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { userController } from '../../controllers';
import { RouteHandler } from '../../types/routes';

export const userRoutes = [
	{
		method: 'GET',
		url: '/api/v1/users',
		schema: {
			response: {
				200: {
					type: 'object',
					properties: {
						users: {},
					},
				},
			},
		},
		handler: (async (
			request: FastifyRequest,
			reply: FastifyReply<ServerResponse>,
		) => {
			try {
				const users = await userController.getAllUsers();

				reply.code(200).send({ users });
			} catch (error) {
				reply.code(error.statusCode).send({ ...error });
			}
		}) as RouteHandler,
	},
	{
		method: 'GET',
		url: '/api/v1/user/:id',
		schema: {
			params: {
				type: 'object',
				properties: {
					id: {
						type: 'integer',
					},
				},
			},
			response: {
				200: {
					type: 'object',
					properties: {
						user: {
							type: 'object',
							properties: {
								id: {
									type: 'integer',
								},
								fullName: {
									type: 'string',
								},
								email: {
									type: 'string',
								},
								articles: {
									type: 'array',
									items: {
										type: 'object',
										properties: {
											id: {
												type: 'integer',
											},
											title: {
												type: 'string',
											},
											body: {
												type: 'string',
											},
											category: {
												type: 'object',
												properties: {
													id: {
														type: 'integer',
													},
													name: {
														type: 'string',
													},
													createdAt: {
														type: 'string',
													},
													updatedAt: {
														type: 'string',
													},
												},
											},
											createdAt: {
												type: 'string',
											},
											updatedAt: {
												type: 'string',
											},
										},
									},
								},
								createdAt: {
									type: 'string',
								},
								updatedAt: {
									type: 'string',
								},
							},
						},
					},
				},
				404: {
					type: 'object',
					properties: {
						error: {
							type: 'object',
							properties: {
								name: {
									type: 'string',
								},
								message: {
									type: 'string',
								},
								statusCode: {
									type: 'integer',
								},
							},
						},
					},
				},
			},
		},
		handler: (async (
			request: FastifyRequest,
			reply: FastifyReply<ServerResponse>,
		) => {
			try {
				const user = await userController.getUserById({
					id: request.params.id,
				});

				reply.code(200).send({
					user,
				});
			} catch (error) {
				reply.code(error.statusCode).send({ error });
			}
		}) as RouteHandler,
	},
];

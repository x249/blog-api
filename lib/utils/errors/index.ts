import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
	CheckViolationError,
	ForeignKeyViolationError,
	NotNullViolationError,
	UniqueViolationError,
	wrapError,
	DBError,
} from 'db-errors';
import { ServerResponse } from 'http';
import { HTTP400Error } from './http400Error';
import { HTTP401Error } from './http401Error';
import { HTTP403Error } from './http403Error';
import { HTTP404Error } from './http404Error';
import { HTTPClientError } from './httpClientError';
import { APIError, ErrorHandler } from '../../types/utils';
import config from '../../config';

/**
 * Handle errors related to User actions and DB actions
 * @param server Fastify instance
 */
const handleErrors: ErrorHandler = (server: FastifyInstance) => {
	return server.addHook(
		'onError',
		async (
			request: FastifyRequest,
			reply: FastifyReply<ServerResponse>,
			error: APIError,
		) => {
			if (config.env === 'production') {
				if (error instanceof HTTPClientError) {
					reply.code(error.statusCode).send({ error });
				}
				reply.code(500).send({ error: 'Internal Server Error' });
			} else if (error instanceof DBError) {
				const wrappedError = wrapError(error);
				if (wrappedError instanceof UniqueViolationError) {
					reply.code(400).send({
						error: {
							name: 'ERR_DB_UNIQUE_CONSTRAINT_VIOLATED',
							statusCode: 400,
							message: `
								Unique constraint ${wrappedError.constraint} 
								failed for table ${wrappedError.table} 
								and columns ${wrappedError.columns}.
							`,
						},
					});
				} else if (wrappedError instanceof NotNullViolationError) {
					reply.code(400).send({
						error: {
							name: 'ERR_DB_NOT_NULL_VIOLATED',
							statusCode: 400,
							message: `
								Not null constraint failed 
								for table ${wrappedError.table} 
								and column ${wrappedError.column}.
							`,
						},
					});
				} else if (wrappedError instanceof CheckViolationError) {
					reply.code(400).send({
						error: {
							name: 'ERR_DB_CONSTRAINT_CHECK_VIOLATED',
							statusCode: 400,
							message: `
								Violation of table ${wrappedError.table} 
								and constraint ${wrappedError.constraint}.
							`,
						},
					});
				} else if (wrappedError instanceof ForeignKeyViolationError) {
					reply.code(400).send({
						error: {
							name: 'ERR_DB_FOREIGN_KEY_VIOLATED',
							statusCode: 400,
							message: `
								Foreign key ${wrappedError.constraint}
								violated on table ${wrappedError.table}.
							`,
						},
					});
				} else {
					reply.code(500).send({
						error: {
							wrappedError,
						},
					});
				}
			} else {
				reply.code(500).send({ error });
			}
		},
	);
};

export {
	HTTP400Error,
	HTTP401Error,
	HTTP403Error,
	HTTP404Error,
	HTTPClientError,
	handleErrors,
};

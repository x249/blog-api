import { HTTP400Error } from './http400Error';
import { HTTP401Error } from './http401Error';
import { HTTP403Error } from './http403Error';
import { HTTP404Error } from './http404Error';
import { HTTPClientError } from './httpClientError';
import { ErrorHandler } from '../../types/utils';
import config from '../../config';

/**
 * Handle errors related to User actions and DB actions
 */
const handleErrors: ErrorHandler = (server) => {
	return server.addHook('onError', async (request, reply, error) => {
		if (error instanceof HTTPClientError) {
			reply.code(error.statusCode).send({ error });
		} else {
			if (!config.isProduction) {
				reply.code(500).send({ error });
			} else {
				reply.code(500).send({
					error: {
						name: 'INTERNAL_SERVER_ERROR',
						message: 'Internal Server Error.',
						statusCode: 500,
					},
				});
			}
		}
	});
};

export {
	HTTP400Error,
	HTTP401Error,
	HTTP403Error,
	HTTP404Error,
	HTTPClientError,
	handleErrors,
};

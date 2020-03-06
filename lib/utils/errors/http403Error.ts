import { HTTPClientError } from './httpClientError';

export class HTTP403Error extends HTTPClientError {
	public readonly name: string = 'ERR_FORBIDDEN';
	public readonly statusCode: number = 403;

	constructor(message: string | object = 'Forbidden') {
		super(message);
	}
}

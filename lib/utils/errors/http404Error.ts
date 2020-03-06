import { HTTPClientError } from './httpClientError';

export class HTTP404Error extends HTTPClientError {
	public readonly name: string = 'ERR_NOT_FOUND';
	public readonly statusCode: number = 404;

	constructor(message: string | object = 'Not Found') {
		super(message);
	}
}

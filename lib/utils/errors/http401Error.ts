import { HTTPClientError } from './httpClientError';

export class HTTP401Error extends HTTPClientError {
	public readonly name: string = 'ERR_UNAUTHROIZED';
	public readonly statusCode: number = 401;

	constructor(message: string | object = 'Unauthorized') {
		super(message);
	}
}

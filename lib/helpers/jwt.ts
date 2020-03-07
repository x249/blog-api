import { sign, verify } from 'jsonwebtoken';
import { promisify } from 'util';
import { GenerateTokenParams } from '../types/helpers';
import config from '../config';
import { errors } from '../utils';

/**
 * Generate a JWT asynchronously
 * @param params.id User ID
 */
const generateToken: (
	params: GenerateTokenParams,
) => Promise<string> = async params => {
	const asnycJwtSign = promisify(sign);

	if (typeof params.id === 'undefined') {
		throw new errors.HTTP400Error('Bad ID input type!');
	}

	return String(await asnycJwtSign({ id: params.id }, config.secret));
};

/**
 * Verify a JWT asynchronously
 * @param token JWT to be verified
 */
const verifyToken: (token: string) => Promise<unknown> = async token => {
	const asyncJwtVerify = promisify(verify);

	return await asyncJwtVerify(token, config.secret);
};

export default { generateToken, verifyToken };

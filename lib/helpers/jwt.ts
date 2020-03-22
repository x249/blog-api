import { sign, verify } from 'jsonwebtoken';
import { GenerateToken, VerifyToken } from '../types/helpers';
import config from '../config';

/**
 * Generate a JWT asynchronously
 * @param params.id User ID
 */
const generateToken: GenerateToken = (params) =>
	sign({ id: params.id }, config.secret, {
		expiresIn: params.expiresIn,
	});

/**
 * Verify a JWT asynchronously
 * @param token JWT to be verified
 */
const verifyToken: VerifyToken = (token) =>
	verify(token, config.secret, {
		complete: true,
	});

export default { generateToken, verifyToken };

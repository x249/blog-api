import { decode, sign } from 'jsonwebtoken';
import { jwt } from '../../lib/helpers';
import config from '../../lib/config';

describe('jwt helper tests', () => {
	test('should successfully generate a jwt', async (done: jest.DoneCallback) => {
		const generatedToken = await jwt.generateToken({
			id: 1,
			expiresIn: '2d',
		});

		const decodedToken = await decode(generatedToken, {
			complete: true,
			json: true,
		});

		expect(decodedToken?.payload?.id).toBe(1);
		done();
	});

	test('should successfuly verify a generated jwt', async (done: jest.DoneCallback) => {
		const token = sign(
			{
				id: 1,
			},
			config.secret,
			{
				expiresIn: '2d',
			},
		);

		const verifiedToken: any = jwt.verifyToken(token);

		expect(verifiedToken.payload.id).toBe(1);

		done();
	});
});

import { checks } from '../../lib/helpers';

describe('checks helper tests', () => {
	test('should succeed at checking if an entity exists', (done: jest.DoneCallback) => {
		const mockedEntity = { id: 1, isDeleted: false };

		const entityExists = checks.entityExists(mockedEntity);

		expect(entityExists).toBeTruthy();
		done();
	});

	test('should fail at checking if an entity exists', (done: jest.DoneCallback) => {
		const mockedEntity = { id: 1, isDeleted: true };

		const entityExists = checks.entityExists(mockedEntity);

		expect(entityExists).toBeFalsy();
		done();
	});
});

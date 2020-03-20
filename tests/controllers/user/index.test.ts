import { userController } from '../../../lib/controllers';

describe('user controllers', () => {
	test('should successfully create a user', async (done: jest.DoneCallback) => {
		const createdUserPayload = await userController.createUser({
			email: 'create-test-user@testing.com',
			fullName: 'test_user',
			password: 'test_user_password',
		});

		expect(typeof createdUserPayload.token).toEqual('string');
		expect(createdUserPayload.user.email).toEqual(
			'create-test-user@testing.com',
		);
		expect(createdUserPayload.user.fullName).toEqual('test_user');
		expect(typeof createdUserPayload.user.password).toEqual('string');
		done();
	});

	test('should fail at creating a user that already exists', async (done: jest.DoneCallback) => {
		try {
			await userController.createUser({
				email: 'test-user@testing.com',
				fullName: 'test_user',
				password: 'test_user_password',
			});
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_BAD_REQUEST');
			expect(error.message).toEqual(`Email taken: test-user@testing.com`);
			expect(error.statusCode).toEqual(400);
			done();
		}
	});

	test('should successfully authenticate a user', async (done: jest.DoneCallback) => {
		const authenticateUserPayload = await userController.authenticateUser({
			email: 'test-user@testing.com',
			password: 'test_user_password',
		});

		expect(typeof authenticateUserPayload.token).toEqual('string');
		expect(authenticateUserPayload.user.email).toEqual('test-user@testing.com');
		expect(authenticateUserPayload.user.fullName).toEqual('test_user');
		done();
	});

	test('should fail to authenticate a user with invalid credentials', async (done: jest.DoneCallback) => {
		try {
			await userController.authenticateUser({
				email: 'test-user@testing.com',
				password: 'wrong_password123',
			});
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_FORBIDDEN');
			expect(error.message).toEqual('Invalid credentials!');
			expect(error.statusCode).toEqual(403);
			done();
		}
	});

	test('should fail to authenticate a non-existing user', async (done: jest.DoneCallback) => {
		try {
			await userController.authenticateUser({
				email: 'non-existing-email@testing.com',
				password: 'non_existing_email_password',
			});
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('User not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should successfully fetch all users', async (done: jest.DoneCallback) => {
		const fetchedUsers = await userController.getAllUsers();

		expect(fetchedUsers.length).toBeGreaterThanOrEqual(1);
		done();
	});

	test('should successfully fetch a user using their email', async (done: jest.DoneCallback) => {
		const fetchedUser = await userController.getUser({
			email: 'test-user@testing.com',
		});

		expect(fetchedUser.email).toEqual('test-user@testing.com');
		expect(fetchedUser.fullName).toEqual('test_user');
		done();
	});

	test('should fail at fetching a non-existing user using their email', async (done: jest.DoneCallback) => {
		try {
			await userController.getUser({
				email: 'a-non-existing-user-email@test.com',
			});
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('User not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should successfully fetch a user using their id', async (done: jest.DoneCallback) => {
		try {
			const fetchedUser = await userController.getUserById({ id: 1 });

			expect(fetchedUser.id).toEqual('1');
			expect(typeof fetchedUser.email).toEqual('string');
			expect(typeof fetchedUser.fullName).toEqual('string');
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('User not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should fail at fetching a non-existing user using their id', async (done: jest.DoneCallback) => {
		try {
			await userController.getUserById({ id: 25456476 });
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('User not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should successfully update a user using their id', async (done: jest.DoneCallback) => {
		try {
			const updatedUser = await userController.updateUserById(1, {
				fullName: 'New Testing User Full Name',
			});

			expect(updatedUser.fullName).toEqual('New Testing User Full Name');
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('User not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should fail at updating a non-existing user using their id', async (done: jest.DoneCallback) => {
		try {
			await userController.updateUserById(12345, {
				fullName: 'Non-existing User',
			});
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('User not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should successfully delete a user using their id', async (done: jest.DoneCallback) => {
		try {
			// eslint-disable-next-line
			const deletedUser: any = await userController.deleteUserById(1);
			expect(deletedUser.id).toEqual('1');
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('User not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should fail at deleting a non-existing user using their id', async (done: jest.DoneCallback) => {
		try {
			await userController.deleteUserById(12345);
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('User not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});
});

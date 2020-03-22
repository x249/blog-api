import { models } from '../../db';
import {
	GetAllUsers,
	GetUser,
	GetUserById,
	CreateUser,
	AuthenticateUser,
	UpdateUserById,
	DeleteUserById,
} from '../../types/controllers/users';
import { checks } from '../../helpers';
import { errors } from '../../utils';
import { argon2i, hash, verify } from 'argon2';
import { jwt } from '../../helpers';

const { User } = models;

/**
 * Fetch all users
 */
const getAllUsers: GetAllUsers = async () => {
	const users = await User.query();

	return users;
};

/**
 * Fetch a user using their id or email
 */
const getUser: GetUser = async (params) => {
	const user = await User.query().findOne({
		...params,
	});

	const userExists = checks.entityExists(user);

	if (!userExists) throw new errors.HTTP404Error('User not found!');

	return user;
};

/**
 * Fetch a user using their ID
 * @returns {Promise<User>} Returned User
 */
const getUserById: GetUserById = async (params) => {
	const user = await User.query().findById(params.id);

	const userExists = checks.entityExists(user);

	if (!userExists) throw new errors.HTTP404Error('User not found!');

	return user;
};

/**
 * Create a user
 */
const createUser: CreateUser = async (params) => {
	const user = await User.query()
		.findOne({
			email: params.email,
		})
		.select('id');

	const userExists = checks.entityExists(user);

	if (userExists) throw new errors.HTTP400Error(`Email taken: ${params.email}`);

	const hashedPassword = await hash(params.password, {
		parallelism: 2,
		memoryCost: 8192,
		version: argon2i,
	});

	const createdUser = await User.query().insertAndFetch({
		email: params.email,
		fullName: params.fullName,
		password: hashedPassword,
	});

	const token = jwt.generateToken({
		id: Number(createdUser.id),
		expiresIn: '2d',
	});

	return {
		user: createdUser,
		token,
	};
};

/**
 * Authenticate a user
 */
const authenticateUser: AuthenticateUser = async (params) => {
	const user = await User.query().findOne({ email: params.email });

	const userExists = checks.entityExists(user);

	if (!userExists) throw new errors.HTTP404Error('User not found!');

	const passwordsMatch = await verify(String(user.password), params.password, {
		parallelism: 2,
		memoryCost: 8192,
		version: argon2i,
	});

	if (!passwordsMatch) throw new errors.HTTP403Error('Invalid credentials!');

	const token = jwt.generateToken({
		id: Number(user.id),
		expiresIn: '2d',
	});

	return {
		user,
		token,
	};
};

/**
 * Update a user using their ID
 */
const updateUserById: UpdateUserById = async (userId, params) => {
	const user = await User.query().findById(userId).select('id');

	const userExists = checks.entityExists(user);

	if (!userExists) throw new errors.HTTP404Error('User not found!');

	if (params.password) {
		const hashedPassword = await hash(params.password, {
			parallelism: 2,
			memoryCost: 8192,
			version: argon2i,
		});

		const updatedUser = user.$query().patchAndFetch({
			...params,
			password: hashedPassword,
		});

		return updatedUser;
	}

	const updatedUser = user.$query().patchAndFetch({
		...params,
	});

	return updatedUser;
};

/**
 * Delete a user using their ID
 */
const deleteUserById: DeleteUserById = async (userId) => {
	const user = await User.query().findById(userId);

	const userExists = checks.entityExists(user);

	if (!userExists) throw new errors.HTTP404Error('User not found!');

	const deletedUser = await User.query().deleteById(userId).returning('*');

	return deletedUser;
};

export default {
	getAllUsers,
	getUser,
	getUserById,
	createUser,
	authenticateUser,
	updateUserById,
	deleteUserById,
};

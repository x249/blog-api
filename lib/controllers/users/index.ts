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
 * @returns {Promise<User[]>} Returned Users
 */
const getAllUsers: GetAllUsers = async () => {
	const users = await User.query();

	return users;
};

/**
 * Fetch a user using their id or email
 * @param params GetUserParams
 * @param params.id User ID
 * @param params.email User Email
 * @returns {Promise<User>} Returned User
 */
const getUser: GetUser = async params => {
	const user = await User.query().findOne({
		...params,
	});

	const userExists = checks.entityExists(user);

	if (!userExists) throw new errors.HTTP404Error('User not found!');

	return user;
};

/**
 * Fetch a user using their ID
 * @param params GetUserByIdParams
 * @param params.id User ID
 * @returns {Promise<User>} Returned User
 */
const getUserById: GetUserById = async params => {
	const user = await User.query().findById(params.id);

	const userExists = checks.entityExists(user);

	if (!userExists) throw new errors.HTTP404Error('User not found!');

	return user;
};

/**
 * Create a user
 * @param params.email Users' email
 * @param params.fullName Users' full name
 * @param params.password Users' password
 */
const createUser: CreateUser = async params => {
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

	const token = await jwt.generateToken({
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
 * @param params.email Users' email
 * @param params.password Users' password
 */
const authenticateUser: AuthenticateUser = async params => {
	const user = await User.query().findOne({ email: params.email });

	const userExists = checks.entityExists(user);

	if (!userExists) throw new errors.HTTP404Error('User not found!');

	const passwordsMatch = await verify(String(user.password), params.password, {
		parallelism: 2,
		memoryCost: 8192,
		version: argon2i,
	});

	if (!passwordsMatch) throw new errors.HTTP403Error('Invalid credentials!');

	const token = await jwt.generateToken({
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
 * @param userId User ID
 * @param params Properties to update in the user
 * @param params.email Updated user email
 * @param params.fullName Updated user full name
 * @param params.password Updated user password
 * @returns {Promise<User>} User with updated fields
 */
const updateUserById: UpdateUserById = async (userId, params) => {
	const user = await User.query()
		.findById(userId)
		.select('id');

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
 * @param userId User ID
 * @returns {Promise<User[]>} Deleted User(s)
 */
const deleteUserById: DeleteUserById = async userId => {
	const user = await User.query().findById(userId);

	const userExists = checks.entityExists(user);

	if (!userExists) throw new errors.HTTP404Error('User not found!');

	const deletedUser = await User.query()
		.deleteById(userId)
		.returning('*');

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

import { models } from '../../db';
import {
	GetAllUsers,
	GetUser,
	GetUserById,
	CreateUser,
	AuthenticateUser,
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

export default {
	getAllUsers,
	getUser,
	getUserById,
	createUser,
	authenticateUser,
};

import { models } from '../../db';
import { GetUserParams, GetUserByIdParams } from './index.d';
import { checks } from '../../helpers';
import { errors } from '../../utils';

const { User } = models;

/**
 * Fetch all users
 * @returns {Promise<User[]>} Users
 */
const getAllUsers = async () => {
	const users = await User.query();

	return users;
};

/**
 * Fetch a user using their id or email
 * @param params GetUserParams
 * @param params.id User ID
 * @param params.email User Email
 * @returns {User} User
 */
const getUser = async (params: GetUserParams) => {
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
 * @returns {User} User
 */
const getUserById = async (params: GetUserByIdParams) => {
	const user = await User.query().findById(params.id);

	const userExists = checks.entityExists(user);

	if (!userExists) throw new errors.HTTP404Error('User not found!');

	return user;
};

export default {
	getAllUsers,
	getUser,
	getUserById,
};

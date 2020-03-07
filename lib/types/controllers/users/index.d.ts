export interface GetUserParams {
	id: number;
	email: string;
}

export interface GetUserByIdParams {
	id: number;
}

export interface CreateUserParams {
	fullName: string;
	email: string;
	password: string;
}

export interface AuthenticateUserParams {
	email: string;
	password: string;
}

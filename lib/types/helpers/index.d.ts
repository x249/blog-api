type GenerateTokenParams = {
	id: number;
	expiresIn: string;
};

export type GenerateToken = (params: GenerateTokenParams) => string;

export type VerifyToken = (token: string) => string | object;

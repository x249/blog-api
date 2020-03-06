import { config } from 'dotenv';

config();

/* Place the required environtment variables here */
const requiredEnvirontmentVariables: string[] = [
	'NODE_ENV',
	'PORT',
	'DATABASE_URL',
	'SECRET',
];

/* Checks if the required variable is injected to the environment */
requiredEnvirontmentVariables.forEach(variable => {
	if (!process.env[variable]) {
		throw new Error(`Variable ${variable} not found in the environment!`);
	}
});

export default {
	env: process.env.NODE_ENV,
	port: parseInt(`${process.env.PORT}`, 10),
	isDev: process.env.NODE_ENV === 'development',
	dbUrl: String(process.env.DATABASE_URL),
	secret: String(process.env.SECRET),
	logger: {
		level: process.env.LOG_LEVEL || 'info',
		disabled: process.env.DISABLE_LOGGING || false,
	},
};

import config from './lib/config';

module.exports = {
	development: {
		client: 'pg',
		connection: config.dbUrl,
		migrations: {
			directory: './lib/db/migrations',
		},
		debug: config.logger.level === 'debug',
	},
	testing: {
		client: 'pg',
		connection: config.dbUrl,
		migrations: {
			directory: './lib/db/migrations',
		},
		debug: config.logger.level === 'debug',
	},
};

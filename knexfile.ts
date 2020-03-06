import config from './lib/config';

module.exports = {
	testing: {
		client: 'pg',
		connection: config.dbUrl,
		migrations: {
			directory: './lib/db/migrations',
		},
	},
};

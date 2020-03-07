/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
	apps: [
		{
			name: 'blog-api',
			script: 'dist/index.js',

			// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
			instances: 'max',
			auto_restart: true,
			watch: true,
			max_memory_restart: '128M',
			exec_mode: 'cluster',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
			error_file: 'logs/pm2/api_err.log',
			out_file: 'logs/pm2/api_out.log',
			log_file: 'logs/pm2/api_combined.log',
			time: true,
		},
	],
};

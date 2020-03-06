import { models } from './models';
import knex from 'knex';
import { Model } from 'objection';
import config from '../config';

const db = knex({
	pool: {
		min: 2,
		max: 30,
	},
	client: 'pg',
	connection: config.dbUrl,
	debug: config.logger.level === 'debug',
});

Model.knex(db);

export { db, models };

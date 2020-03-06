import Knex from 'knex';

exports.up = ((knex, promise) => {
	return knex.schema.createTable('user_account', table => {
		table.increments('id');
		table.string('full_name', 256).notNullable();
		table.string('email', 256).notNullable();
		table.string('password').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
}) as (knex: Knex, promise: Promise<any>) => Knex.SchemaBuilder;

exports.down = ((knex, promise) => {
	return knex.schema.dropTableIfExists('user_account');
}) as (knex: Knex, promise: Promise<any>) => Knex.SchemaBuilder;

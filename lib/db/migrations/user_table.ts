import Knex from 'knex';

exports.up = ((knex, Promise) => {
	return knex.schema.createTable('user_account', (table) => {
		table.bigIncrements('id');
		table.string('full_name', 256).notNullable();
		table.string('email', 256).notNullable().unique();
		table.string('password').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
}) as (knex: Knex, Promise: PromiseConstructor) => Knex.SchemaBuilder;

exports.down = ((knex, Promise) =>
	knex.schema.dropTableIfExists('user_account')) as (
	knex: Knex,
	Promise: PromiseConstructor,
) => Knex.SchemaBuilder;

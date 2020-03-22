import Knex from 'knex';

exports.up = ((knex, Promise) =>
	knex.schema.createTable('category', (table) => {
		table.bigIncrements('id');
		table.string('name', 256).notNullable().unique();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	})) as (knex: Knex, Promise: PromiseConstructor) => Knex.SchemaBuilder;

exports.down = ((knex, Promise) =>
	knex.schema.dropTableIfExists('category')) as (
	knex: Knex,
	Promise: PromiseConstructor,
) => Knex.SchemaBuilder;

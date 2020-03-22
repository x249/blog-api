import Knex from 'knex';

exports.up = ((knex, Promise) =>
	knex.schema.createTable('article', (table) => {
		table.bigIncrements('id');
		table.bigInteger('user_id').notNullable();
		table.bigInteger('category_id').notNullable();
		table.string('title', 256).notNullable().unique();
		table.text('body').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	})) as (knex: Knex, Promise: PromiseConstructor) => Knex.SchemaBuilder;

exports.down = ((knex, Promise) =>
	knex.schema.dropTableIfExists('article')) as (
	knex: Knex,
	Promise: ProxyConstructor,
) => Knex.SchemaBuilder;

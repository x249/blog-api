import BaseModel from './base';

export class Article extends BaseModel {
	id?: number;
	userId?: number;
	categoryId?: number;
	title?: string;
	body?: string;
	createdAt?: string;
	updatedAt?: string;

	/**
	 * Sets the table name
	 */
	static get tableName(): string {
		return 'article';
	}

	/**
	 * Defines the table's schema. This is used for validation.
	 */
	static get jsonSchema(): {} {
		return {
			type: 'object',
			required: ['userId', 'categoryId', 'title', 'body'],

			properties: {
				id: { type: 'integer', readOnly: true },
				userId: { type: 'integer' },
				categoryId: { type: 'integer' },
				title: { type: 'string', minLength: 3, maxLength: 256 },
				body: { type: 'string' },
				createdAt: { type: 'string', readOnly: true },
				updatedAt: { type: 'string' },
			},
		};
	}

	/**
	 * Defines the zones relations
	 */
	static get relationMappings(): {} {
		// Importing models here is a one way to avoid require loops.
		// eslint-disable-next-line
		const User = require('./user');
		// eslint-disable-next-line
		const Category = require('./category');

		return {
			author: {
				relation: BaseModel.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'article.user_id',
					to: 'user_account.id',
				},
			},
			category: {
				relaton: BaseModel.BelongsToOneRelation,
				modelClass: Category,
				join: {
					from: 'article.category_id',
					to: 'category.id',
				},
			},
		};
	}
}

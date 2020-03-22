import BaseModel from './base';

export class User extends BaseModel {
	id?: number;
	fullName?: string;
	email?: string;
	password?: string;
	articles?: [];
	createdAt?: string;
	updatedAt?: string;

	/**
	 * Sets the table name
	 */
	static get tableName(): string {
		return 'user_account';
	}

	/**
	 * Defines the table's schema. This is used for validation.
	 */
	static get jsonSchema(): {} {
		return {
			type: 'object',
			required: ['fullName', 'email', 'password'],

			properties: {
				id: { type: 'integer', readOnly: true },
				fullName: { type: 'string', minLength: 3, maxLength: 256 },
				email: { type: 'string', minLength: 3, maxLength: 256 },
				password: { type: 'string' },
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
		const Article = require('./article');

		return {
			articles: {
				relation: BaseModel.HasManyRelation,
				modelClass: Article,
				join: {
					from: 'user_account.id',
					to: 'article.user_id',
				},
			},
		};
	}
}

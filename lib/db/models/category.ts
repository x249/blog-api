import BaseModel from './base';

export class Category extends BaseModel {
	id?: number;
	name?: string;
	createdAt?: string;
	updatedAt?: string;

	/**
	 * Sets the table name
	 */
	static get tableName(): string {
		return 'category';
	}

	/**
	 * Defines the table's schema. This is used for validation.
	 */
	static get jsonSchema(): {} {
		return {
			type: 'object',
			required: ['name'],

			properties: {
				id: { type: 'integer', readOnly: true },
				name: { type: 'string', minLength: 3, maxLength: 256 },
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
					from: 'category.id',
					to: 'article.category_id',
				},
			},
		};
	}
}

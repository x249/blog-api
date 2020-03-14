import { Model, snakeCaseMappers, ColumnNameMappers, mixin } from 'objection';
import visibilityPlugin from 'objection-visibility';
import { DBErrors } from 'objection-db-errors';

export default class BaseModel extends mixin(Model, [
	visibilityPlugin,
	DBErrors,
]) {
	/**
	 * Defines the lookup paths for models references in 'relationMappings'
	 */
	static get modelPaths(): string[] {
		return [__dirname];
	}

	/**
	 * Sets the mapping between column names in the database and model property names.
	 */
	static get columnNameMappers(): ColumnNameMappers {
		return snakeCaseMappers();
	}
}

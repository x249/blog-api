const entityExists: (entity: any) => boolean = (entity) =>
	!!entity && !entity.isDeleted;

export default {
	entityExists,
};

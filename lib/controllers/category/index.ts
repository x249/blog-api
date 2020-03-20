import { models } from '../../db';
import { checks } from '../../helpers';
import { errors } from '../../utils';
import {
	GetAllCategories,
	GetCategory,
	GetCategoryById,
	CreateCategory,
	UpdateCategoryById,
	DeleteCateogry,
	DeleteCategoryById,
} from '../../types/controllers/category';

const { Category } = models;

/**
 * Fetch all categories
 */
const getAllCategories: GetAllCategories = async () => {
	const categories = await Category.query();

	return categories;
};

/**
 * Fetch a category using params
 */
const getCategory: GetCategory = async params => {
	const category = await Category.query().findOne({
		...params,
	});

	const categoryExists = checks.entityExists(category);

	if (!categoryExists)
		throw new errors.HTTP404Error(`Category ${params.name} not found!`);

	return category;
};

/**
 * Fetch a category using ID param
 */
const getCategoryById: GetCategoryById = async params => {
	const category = await Category.query().findById(params.id);

	const categoryExists = checks.entityExists(category);

	if (!categoryExists)
		throw new errors.HTTP404Error(`Category with ID ${params.id} not found!`);

	return category;
};

/**
 * Create a category
 */
const createCategory: CreateCategory = async params => {
	const category = await Category.query().findOne({
		name: params.name,
	});

	const categoryExists = checks.entityExists(category);

	if (categoryExists)
		throw new errors.HTTP400Error(`Category ${category.name} already exists!`);

	const createdCategory = Category.query().insertAndFetch({
		...params,
	});

	return createdCategory;
};

/**
 * Update a category using ID
 */
const updateCategoryById: UpdateCategoryById = async (categoryId, params) => {
	const category = await Category.query().findById(categoryId);

	const categoryExists = checks.entityExists(category);

	if (!categoryExists)
		throw new errors.HTTP404Error(`Category with ID ${categoryId} not found!`);

	const updatedCategory = await category.$query().patchAndFetch({ ...params });

	return updatedCategory;
};

/**
 * Delete a category using params
 */
const deleteCategory: DeleteCateogry = async params => {
	const category = await Category.query().findOne({ ...params });

	const categoryExists = checks.entityExists(category);

	if (!categoryExists)
		throw new errors.HTTP404Error(`Category ${params.name} not found!`);

	const deletedCategory = category
		.$query()
		.delete()
		.returning('*');

	return deletedCategory;
};

/**
 * Delete a category using ID
 */
const deleteCategoryById: DeleteCategoryById = async params => {
	const category = await Category.query().findById(params.id);

	const categoryExists = checks.entityExists(category);

	if (!categoryExists)
		throw new errors.HTTP404Error(`Category ${params.id} not found!`);

	return await category
		.$query()
		.delete()
		.returning('*');
};

export default {
	getAllCategories,
	getCategory,
	getCategoryById,
	createCategory,
	updateCategoryById,
	deleteCategory,
	deleteCategoryById,
};

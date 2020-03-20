import { Category } from '../../../db/models/category';

interface CreateCategoryParams {
	name: string;
}

interface GetCategoryParams {
	name?: string;
}

interface GetCategoryByIdParams {
	id: number;
}

interface UpdateCategoryByIdParams {
	name?: string;
}

interface DeleteCategoryParams {
	name?: string;
}

interface DeleteCategoryByIdParams {
	id: number;
}

export type GetAllCategories = () => Promise<Category[]>;

export type GetCategory = (params: GetCategoryParams) => Promise<Category>;

export type GetCategoryById = (
	params: GetCategoryByIdParams,
) => Promise<Category>;

export type CreateCategory = (
	params: CreateCategoryParams,
) => Promise<Category>;

export type UpdateCategoryById = (
	categoryId: number,
	params: UpdateCategoryByIdParams,
) => Promise<Category>;

export type DeleteCateogry = (
	params: DeleteCategoryParams,
) => Promise<Category | Category[]>;

export type DeleteCategoryById = (
	params: DeleteCategoryByIdParams,
) => Promise<Category | Category[]>;

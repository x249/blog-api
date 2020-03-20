import { Article } from '../../../db/models/article';

interface GetArticleParams {
	title?: string;
}

interface GetArticleByIdParams {
	id: number;
}

interface CreateArticleParams {
	userId: number;
	categoryId: number;
	title: string;
	body: string;
}

interface UpdateArticleParams {
	userId?: number;
	categoryId?: number;
	title?: string;
	body?: string;
}

interface DeleteArticleParams {
	id: number;
}

export type GetAllArticles = () => Promise<Article[]>;

export type GetArticle = (params: GetArticleParams) => Promise<Article>;

export type GetArticleById = (params: GetArticleByIdParams) => Promise<Article>;

export type CreateArticle = (params: CreateArticleParams) => Promise<Article>;

export type UpdateArticle = (
	articleId: number,
	params: UpdateArticleParams,
) => Promise<Article>;

export type DeleteArticle = (
	params: DeleteArticleParams,
) => Promise<Article | Article[]>;

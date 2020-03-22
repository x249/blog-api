import { models } from '../../db';
import { checks } from '../../helpers';
import { errors } from '../../utils';
import {
	GetAllArticles,
	GetArticle,
	GetArticleById,
	CreateArticle,
	UpdateArticle,
	DeleteArticle,
} from '../../types/controllers/articles';

const { Article, User, Category } = models;

/**
 * Fetch all articles
 */
const getAllArticles: GetAllArticles = async () => {
	const articles = await Article.query();

	return articles;
};

/**
 * Fetch an article using params
 */
const getArticle: GetArticle = async (params) => {
	const article = await Article.query().findOne({
		...params,
	});

	const articleExists = checks.entityExists(article);

	if (!articleExists)
		throw new errors.HTTP404Error(`Article ${params.title} not found!`);

	return article;
};

/**
 * Fetch an article using ID
 */
const getArticleById: GetArticleById = async (params) => {
	const article = await Article.query().findById(params.id);

	const articleExists = checks.entityExists(article);

	if (!articleExists)
		throw new errors.HTTP404Error(`Article with ID ${params.id} not found!`);

	return article;
};

/**
 * Create an article
 */
const createArticle: CreateArticle = async (params) => {
	const article = await Article.query().findOne({
		title: params.title,
	});

	const user = await User.query().findById(params.userId).select('id');

	const category = await Category.query()
		.findById(params.categoryId)
		.select('id');

	const articleExists = checks.entityExists(article);
	const userExists = checks.entityExists(user);
	const categoryExists = checks.entityExists(category);

	if (articleExists)
		throw new errors.HTTP400Error(`Article ${params.title} already exists!`);

	if (!userExists)
		throw new errors.HTTP404Error(`User with ID ${params.userId} not found!`);

	if (!categoryExists)
		throw new errors.HTTP404Error(
			`Category with ID ${params.categoryId} not found!`,
		);

	const createdArticle = await Article.query().insertAndFetch({
		...params,
	});

	return createdArticle;
};

/**
 * Update an article using ID
 */
const updateArticle: UpdateArticle = async (articleId, params) => {
	const article = await Article.query().findById(articleId).select('id');

	const articleExists = checks.entityExists(article);

	if (!articleExists)
		throw new errors.HTTP404Error(`Article with ID ${articleId} not found!`);

	const updatedArticle = article.$query().patchAndFetch({
		...params,
	});

	return updatedArticle;
};

/**
 * Delete an article using ID
 */
const deleteArticle: DeleteArticle = async (params) => {
	const article = await Article.query().findById(params.id).select('id');

	const articleExists = checks.entityExists(article);

	if (!articleExists)
		throw new errors.HTTP404Error(`Article with ID ${params.id} not found!`);

	const deletedArticle = article.$query().delete().returning('*');

	return deletedArticle;
};

export default {
	getAllArticles,
	getArticle,
	getArticleById,
	createArticle,
	updateArticle,
	deleteArticle,
};

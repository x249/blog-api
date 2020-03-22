import {
	articleController,
	userController,
	categoryController,
} from '../../../lib/controllers';
import { Category } from '../../../lib/db/models/category';
import { User } from '../../../lib/db/models/user';

describe('article controllers', () => {
	let userPayload: { user: User; token: string };
	let category: Category;

	beforeAll(async () => {
		userPayload = await userController.createUser({
			email: 'article-tests-user@testing.co',
			fullName: 'Articles test user',
			password: 'article_tests_us3r',
		});

		category = await categoryController.createCategory({
			name: 'Article Tests Category',
		});
	});

	test('should successfully fetch all articles', async (done: jest.DoneCallback) => {
		const articles = await articleController.getAllArticles();

		expect(typeof articles).toEqual('object');
		done();
	});

	test('should successfully fetch an article using its title', async (done: jest.DoneCallback) => {
		const userId = parseInt(String(userPayload.user.id), 10);
		const categoryId = parseInt(String(category.id), 10);

		const fetchArticleByTitlePayload = await articleController.createArticle({
			userId,
			categoryId,
			title: 'Mocked Article #1',
			body: 'Mocked Article Body #1',
		});

		const fetchedArticleResponse = await articleController.getArticle({
			title: fetchArticleByTitlePayload.title,
		});

		expect(fetchedArticleResponse.title).toEqual(
			fetchArticleByTitlePayload.title,
		);
		done();
	});

	test('should fail at fetching an article using its title', async (done: jest.DoneCallback) => {
		try {
			await articleController.getArticle({ title: 'Non-existing Article' });
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('Article Non-existing Article not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should succeed at fetching an article using its ID', async (done: jest.DoneCallback) => {
		const userId = parseInt(String(userPayload.user.id), 10);
		const categoryId = parseInt(String(category.id), 10);

		const fetchArticleByIdPayload = await articleController.createArticle({
			userId,
			categoryId,
			title: 'Mocked Article #2',
			body: 'Mocked Article Body #2',
		});

		const fetchedArticleResponse = await articleController.getArticleById({
			id: parseInt(String(fetchArticleByIdPayload.id), 10),
		});

		expect(fetchedArticleResponse.id).toEqual(fetchArticleByIdPayload.id);
		expect(fetchedArticleResponse.title).toEqual(fetchArticleByIdPayload.title);
		expect(fetchedArticleResponse.body).toEqual(fetchArticleByIdPayload.body);
		done();
	});

	test('should fail at fetching an article using its ID', async (done: jest.DoneCallback) => {
		const mockedArticleId = 2435465;
		try {
			await articleController.getArticleById({ id: mockedArticleId });
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual(
				`Article with ID ${mockedArticleId} not found!`,
			);
			expect(error.statusCode).toEqual(404);
			done();
		}
	});
});

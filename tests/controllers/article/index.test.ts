import { articleController } from '../../../lib/controllers';

describe('article controllers', () => {
	test('should successfully fetch all articles', async (done: jest.DoneCallback) => {
		const articles = await articleController.getAllArticles();

		expect(typeof articles).toEqual('object');
		done();
	});
});

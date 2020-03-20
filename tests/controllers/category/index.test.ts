import { categoryController } from '../../../lib/controllers';

describe('category controllers', () => {
	test('should successfully fetch all categories', async (done: jest.DoneCallback) => {
		const categories = await categoryController.getAllCategories();

		expect(typeof categories).toEqual('object');
		done();
	});

	test('should successfully create a category', async (done: jest.DoneCallback) => {
		const createdCateogryPayload = await categoryController.createCategory({
			name: 'Testing',
		});

		expect(typeof createdCateogryPayload.name).toEqual('string');
		expect(createdCateogryPayload.name).toEqual('Testing');
		done();
	});

	test('should fail at creating a category that already exists', async (done: jest.DoneCallback) => {
		try {
			await categoryController.createCategory({
				name: 'Testing',
			});
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_BAD_REQUEST');
			expect(error.message).toEqual('Category Testing already exists!');
			expect(error.statusCode).toEqual(400);
			done();
		}
	});

	test('should successfully fetch a category using its name', async (done: jest.DoneCallback) => {
		const fetchedCategory = await categoryController.getCategory({
			name: 'Testing',
		});

		expect(fetchedCategory.name).toEqual('Testing');
		done();
	});

	test('should fail at fetching a cateogry using its name', async (done: jest.DoneCallback) => {
		try {
			await categoryController.getCategory({
				name: 'Non-existing-category',
			});
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual(
				'Category Non-existing-category not found!',
			);
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should successfully fetch a category using its ID', async (done: jest.DoneCallback) => {
		const fetchCategoryPayload = await categoryController.createCategory({
			name: 'Create Fetch Test Category',
		});

		const fetchedCategory = await categoryController.getCategoryById({
			id: parseInt(String(fetchCategoryPayload.id), 10),
		});

		expect(fetchedCategory.name).toEqual(fetchCategoryPayload.name);
		done();
	});

	test('should fail at fetching a category using its ID', async (done: jest.DoneCallback) => {
		try {
			await categoryController.getCategoryById({
				id: 23546,
			});
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('Category with ID 23546 not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should successfully update a category using its ID', async (done: jest.DoneCallback) => {
		const updatedCategory = await categoryController.updateCategoryById(1, {
			name: 'UpdatedTesting',
		});

		expect(updatedCategory.name).toEqual('UpdatedTesting');
		done();
	});

	test('should fail at updaing a category using its ID', async (done: jest.DoneCallback) => {
		try {
			await categoryController.updateCategoryById(1234423, {
				name: 'UpdatedTesting',
			});
			done();
		} catch (error) {
			expect(error.name).toEqual('ERR_NOT_FOUND');
			expect(error.message).toEqual('Category with ID 1234423 not found!');
			expect(error.statusCode).toEqual(404);
			done();
		}
	});

	test('should successfully delete a category using its ID', async (done: jest.DoneCallback) => {
		const deletedCategory = await categoryController.deleteCategoryById({
			id: 1,
		});

		expect(typeof deletedCategory).toEqual('object');
		done();
	});
});

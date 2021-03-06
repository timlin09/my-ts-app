import ItemService from '../item.service';
import testData from './data';
import { BaseDal } from '../../../db/dal/item';
import TestDalModel from '../../../db/dal/test.dal.moel';

let testDalModel : TestDalModel;
let itemServiceEmpty : ItemService<BaseDal>;

beforeEach(() => {
  testDalModel = new TestDalModel();
  itemServiceEmpty = new ItemService(testDalModel);
  testDalModel.fakeItem = testData;
});

afterEach(() => {
  testDalModel.fakeItem = [];
});

describe('POST /items', () => {
  test('create item with normal data', async () => {
    const res = await itemServiceEmpty.createItem({ name: 'John', price: 1000 });
    expect(res).toMatchObject({ code: 200, data: { name: 'John', price: 1000 } });
  });
  test('create item with partical data(price)', async () => {
    const res = await itemServiceEmpty.createItem({ price: 1000 });
    expect(res).toMatchObject({ code: 404, data: null });
  });
  test('create item with partical data(name)', async () => {
    const res = await itemServiceEmpty.createItem({ name: 'John' });
    expect(res).toMatchObject({ code: 404, data: null });
  });
  test('create item with empty data', async () => {
    const res = await itemServiceEmpty.createItem({ });
    expect(res).toMatchObject({ code: 404, data: null });
  });
});

describe('GET /items/id', () => {
  test('get item with normal itemId', async () => {
    const res = await itemServiceEmpty.getItemById(1);
    if (!res.data) {
      expect(res).toMatchObject({ code: 500, message: res.message });
      return;
    }
    expect(res).toMatchObject({ code: 200, message: 'successful' });
  });
  test('get item with invaild type of itemId(string)', async (id = 'a') => {
    const itemsId = id as unknown as number;
    const res = await itemServiceEmpty.getItemById(itemsId);
    expect(res).toMatchObject({ code: 404, message: 'getItemById has error invaild itemId!' });
  });
  test('get item with large itemId', async () => {
    const res = await itemServiceEmpty.getItemById(10000);
    expect(res).toMatchObject({ code: 500, data: null });
  });
  test('get item with itemId = NaN', async () => {
    const res = await itemServiceEmpty.getItemById(NaN);
    expect(res).toMatchObject({ code: 404 });
  });
});

describe('PUT /items/id', () => {
  test('update item with normal data', async () => {
    const res = await itemServiceEmpty.updateItemById(1, { name: 'Tim1', price: 1000 });
    if (!res.data) {
      expect(res.code).toBe(500);
      return;
    }
    expect(res.code).toBe(200);
    const price = res.data?.price || 0;
    const diff = price - res.oldPrice;
    expect(diff).toBe(1000);
  });

  test('update item with unnormal data(price is string)', async (price = 'z') => {
    const p = price as unknown as number;
    const res = await itemServiceEmpty.updateItemById(1, { price: p });
    if (!res.data) {
      expect(res.code).toBe(500);
      return;
    }
    expect(res.code).toBe(200);
    const prices = res.data?.price || 0;
    const diff = prices - res.oldPrice;
    expect(diff).toBe(0);
  });
  test('update item with empty data', async () => {
    const res = await itemServiceEmpty.updateItemById(1, {});
    expect(res.code).toBe(404);
  });
});

describe('GET /items', () => {
  test('get all items', async () => {
    const res = await itemServiceEmpty.getItemAll();
    expect(res.code).toBe(200);
  });
});

describe('DELETE /items/id', () => {
  test('delet item with small random int', async () => {
    const res = await itemServiceEmpty.deleteItemById(1, 10);
    if (!res.data && res.code !== 200) {
      expect(res).toMatchObject({ code: 500 });
      return;
    }
    if (res.oldPrice > 10) {
      expect(res).toMatchObject({ code: 200 });
    } else {
      expect(res).toMatchObject({ code: 200, data: null });
    }
  });
  test('delet item with large random int', async () => {
    const res = await itemServiceEmpty.deleteItemById(1, 200000);
    if (!res.data && res.code !== 200) {
      expect(res).toMatchObject({ code: 500 });
      return;
    }

    if (res.oldPrice > 20000) {
      expect(res).toMatchObject({ code: 200 });
    } else {
      expect(res).toMatchObject({ code: 200, data: null });
    }
  });

  test('delet item with large itemId & rnt', async () => {
    const res = await itemServiceEmpty.deleteItemById(10000, 200000);
    if (!res.data && res.code !== 200) {
      expect(res).toMatchObject({ code: 500 });
      return;
    }

    if (res.oldPrice > 20000) {
      expect(res).toMatchObject({ code: 200 });
    } else {
      expect(res).toMatchObject({ code: 200, data: null });
    }
  });
});

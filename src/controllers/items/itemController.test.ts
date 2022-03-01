import ItemService from './itemService';

describe('GET /items', () => {
  test('get all items', async () => {
    const res = await ItemService.getItemAll();
    expect(res.code).toBe(200);
  });
});

describe('POST /items', () => {
  test('data={name: "John", price: 1000}', () => {
    const res = ItemService.createItem({ name: 'John', price: 1000 });
    expect(res).toMatchObject({ code: 200, data: { name: 'John', price: 1000 } });
  });
  test('data={price: 1000}', () => {
    const res = ItemService.createItem({ price: 1000 });
    expect(res).toMatchObject({ code: 404, data: null });
  });
  test('data={name: John}', () => {
    const res = ItemService.createItem({ name: 'John' });
    expect(res).toMatchObject({ code: 404, data: null });
  });
  test('data={}', () => {
    const res = ItemService.createItem({ });
    expect(res).toMatchObject({ code: 404, data: null });
  });
});

describe('GET /items/id', () => {
  test('id = 1', async () => {
    const res = await ItemService.getItemById(1);
    expect(res).toMatchObject({ code: 200, message: 'successful' });
  });
  test('id = a', async (id = 'a') => {
    const itemsId = id as unknown as number;
    const res = await ItemService.getItemById(itemsId);
    expect(res).toMatchObject({ code: 404, message: 'getItemById has error invaild itemId!' });
  });
  test('id = 10000', async () => {
    const res = await ItemService.getItemById(10000);
    expect(res).toMatchObject({ code: 500, data: null });
  });
  test('id = NaN', async () => {
    const res = await ItemService.getItemById(NaN);
    expect(res).toMatchObject({ code: 404 });
  });
});

describe('PUT /items/id', () => {
  test('id = 1, data={name=Tim1, price: 1000}', async () => {
    const res = await ItemService.updateItemById(1, { name: 'Tim1', price: 1000 });
    expect(res.code).toBe(200);
    const price = res.data?.price || 0;
    const diff = price - res.oldPrice;
    expect(diff).toBe(1000);
  });

  test('id = 1, data={price: "z"}', async (price = 'z') => {
    const p = price as unknown as number;
    const res = await ItemService.updateItemById(1, { price: p });
    expect(res.code).toBe(200);
    const prices = res.data?.price || 0;
    const diff = prices - res.oldPrice;
    expect(diff).toBe(0);
  });
  test('id = 1, data = {}', async () => {
    const res = await ItemService.updateItemById(1, {});
    expect(res.code).toBe(404);
  });
});

describe('DELETE /items/id', () => {
  test('id = 1, customRandor=10', async () => {
    const res = await ItemService.deleteItemById(1, 10);

    if (res.oldPrice > 10) {
      expect(res).toMatchObject({ code: 200 });
    } else {
      expect(res).toMatchObject({ code: 200, data: null });
    }
  });
  test('id = 1, customRandor=200000', async () => {
    const res = await ItemService.deleteItemById(1, 200000);

    if (res.oldPrice > 20000) {
      expect(res).toMatchObject({ code: 200 });
    } else {
      expect(res).toMatchObject({ code: 200, data: null });
    }
  });
});

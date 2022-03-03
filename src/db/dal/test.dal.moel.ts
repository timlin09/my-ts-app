import { ItemInput, ItemOutput } from '../model/item.model';
import { BaseDal } from './item';

class TestDalModel implements BaseDal {
  private fakeItems: ItemOutput[];

  constructor() {
    this.fakeItems = [];
  }

  get fakeItem() {
    return this.fakeItems;
  }

  set fakeItem(fakeItems) {
    this.fakeItems = fakeItems;
  }

  getById = async (id:number) => {
    const item = this.fakeItems.find((el) => el.id === id);
    if (item) {
      return item;
    }

    throw new Error(`Not find item by itemId: ${id}`);
  };

  getAll = async () => this.fakeItems;

  createItem = async (data:ItemInput) => {
    if (!data.name || !data.price) {
      throw new Error('invalid params/body');
    }
    const newItem: ItemOutput = {
      id: this.fakeItems.length + 1,
      name: data.name,
      price: data.price,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    this.fakeItems.push(newItem);

    return newItem;
  };

  update = async (id: number, data:Partial<ItemInput>) => {
    const itemIndex = this.fakeItems.findIndex((el) => el.id === id);

    if (itemIndex === -1) {
      throw new Error(`Not find item by itemId: ${id}`);
    }

    const updateItem = { ...this.fakeItems[itemIndex], ...data };
    this.fakeItems[itemIndex] = updateItem;

    return updateItem;
  };

  deleteById = async (id:number) => {
    const itemIndex = this.fakeItems.findIndex((el) => el.id === id);

    if (itemIndex === -1) {
      throw new Error(`Not find item by itemId: ${id}`);
    }

    this.fakeItems.splice(itemIndex, 0);
    return !!1;
  };
}

export default TestDalModel;

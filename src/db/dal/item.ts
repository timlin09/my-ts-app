/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import ItemModel, { ItemInput, ItemOutput } from '../model/item.model';

export interface BaseDal{
  getById(_id:number): Promise<ItemOutput>;
  getAll():Promise<ItemOutput[]>;
  createItem(_data:ItemInput):Promise<ItemOutput>
  update(_id:number, _data:Partial<ItemInput>):Promise<ItemOutput>
  deleteById(_id:number): Promise<Boolean>
}

class ItemDal implements BaseDal {
  public itemModel;

  constructor() {
    this.itemModel = ItemModel;
  }

  public async createItem(payload: ItemInput): Promise<ItemOutput> {
    const newItem = await this.itemModel.create(payload);
    return newItem;
  }

  async update(id: number, payload: Partial<ItemInput>): Promise<ItemOutput> {
    const item = await this.itemModel.findByPk(id);
    if (!item) {
      // @todo throw custom error
      throw new Error('not found');
    }
    const updatedItem = await (item as ItemModel).update(payload);
    return updatedItem;
  }

  async getById(id: number): Promise<ItemOutput> {
    const item = await this.itemModel.findByPk(id);
    if (!item) {
      // @todo throw custom error
      throw new Error('not found');
    }
    return item;
  }

  async deleteById(id: number): Promise<boolean> {
    const deletedItemModelCount = await this.itemModel.destroy({
      where: { id },
    });
    return !!deletedItemModelCount;
  }

  async getAll(limit: number = 10): Promise<ItemOutput[]> {
    return this.itemModel.findAll({ limit });
  }
}

export default ItemDal;

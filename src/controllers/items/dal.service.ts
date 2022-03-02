/* eslint-disable class-methods-use-this */
import BaseService from './base.service';
import { BaseDal } from '../../db/dal/item';
import { ItemInput, ItemOutput } from '../../db/model/item.model';

class DalService<T extends BaseDal> extends BaseService<number, ItemInput, ItemOutput> {
  public dal:T;

  constructor(Dal: T) {
    super();
    this.dal = Dal;
  }

  async getOne(id: number): Promise< ItemOutput | null> {
    const resData = await this.dal.getById(id);
    return resData;
  }

  async getAll():Promise< ItemOutput[] | []> {
    const resData = await this.dal.getAll();
    return resData;
  }

  async create(itemData: ItemInput): Promise<ItemOutput | null> {
    const resData = await this.dal.createItem(itemData);
    return resData;
  }

  async update(id:number, itemData:Partial<ItemInput>): Promise<ItemOutput | null> {
    const resData = await this.dal.update(id, itemData);
    return resData;
  }

  async delete(id: number): Promise<Boolean> {
    const isDelete = await this.dal.deleteById(id);
    return isDelete;
  }
}

export default DalService;

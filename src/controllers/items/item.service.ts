/* eslint-disable class-methods-use-this */
import { BaseDal } from '../../db/dal/item';
import DalService from './dal.service';
import BaseService from './base.service';
import getRandomInt from '../../utils/getRandom';
import { ItemInput, ItemOutput } from '../../db/model/item.model';

export interface ItemServiceOutput {
  code: number;
  message: string;
  data?: ItemOutput | ItemInput | null;
  datas?: ItemOutput[] | null;
  [propName: string]: any;
}

class ItemService<T extends BaseDal> extends BaseService<number, ItemInput, ItemOutput> {
  public dalService: DalService<T>;

  constructor(dal:T) {
    super();
    this.dalService = new DalService(dal);
  }

  async getAll() {
    try {
      const resData = await this.dalService.getAll();
      return resData;
    } catch (e) {
      throw new Error(`ItemService.getAll has error: ${e}`);
    }
  }

  async getOne(id: number): Promise<ItemOutput | null> {
    try {
      const resData = await this.dalService.getOne(id);
      return resData;
    } catch (e) {
      throw new Error(`ItemService.getOne has error: ${e}`);
    }
  }

  async getItemAll():Promise<ItemServiceOutput> {
    try {
      const datas:ItemOutput[] = await this.dalService.getAll();
      return { code: 200, message: 'successful', datas };
    } catch (e) {
      return { code: 500, message: `getItemAll has error ${e}`, datas: null };
    }
  }

  createItem(itemData:ItemInput): ItemServiceOutput {
    if (!itemData.name || !itemData.price) {
      return { code: 404, message: 'invalid name/price value!', data: null };
    }
    return { code: 200, message: 'successful', data: itemData };
  }

  async getItemById(id:number):Promise<ItemServiceOutput> {
    try {
      const itemId = Number(id) || 0;
      if (!itemId) {
        return { code: 404, message: 'getItemById has error invaild itemId!', data: null };
      }
      const data = await this.getOne(itemId);

      return { code: 200, message: 'successful', data };
    } catch (e) {
      return { code: 500, message: `getItemById has error ${e}`, data: null };
    }
  }

  async deleteItemById(
    id: number,
    customRandor:number = 0,
  ):Promise<ItemServiceOutput> {
    const itemId = Number(id) || 0;
    if (!itemId) {
      return {
        code: 404,
        message: ' deleteItemById has invaild itemId!',
        data: null,
      };
    }

    try {
      const item = await this.getOne(itemId);
      let rntNumber:number;
      if (!customRandor) {
        rntNumber = getRandomInt(100);
      } else {
        rntNumber = customRandor;
      }

      if (!item) {
        throw new Error(`can not find item by id: ${itemId}`);
      }

      if (item.price - rntNumber < 0) {
        return {
          code: 200,
          message: 'delete',
          data: null,
          oldPrice: item.price,
        };
      }
      return {
        code: 200,
        message: 'delete',
        data: { ...item, price: item.price - rntNumber },
        oldPrice: item.price,
      };
    } catch (e) {
      return {
        code: 500,
        message: `deleteItemById has error ${e}`,
        data: null,
      };
    }
  }

  async updateItemById(id:number, itemData:ItemInput):Promise<ItemServiceOutput> {
    try {
      const itemId = Number(id) || 0;
      const price = Number(itemData.price) || 0;

      if (!itemId) {
        return { code: 404, message: ' updateItemById has invaild itemId!', data: null };
      }
      if (Object.keys(itemData).length === 0) {
        return { code: 404, message: 'no update data!!', data: null };
      }

      const item = await this.getOne(itemId);

      if (!item) {
        throw new Error(`can not find item by id: ${itemId}`);
      }

      const totalPrice = item.price + price;
      const newPrice = totalPrice > 0 ? totalPrice : 0;

      const newItem: ItemInput = {
        ...item,
        ...itemData,
        price: newPrice,
        updatedAt: new Date(),
      };
      return {
        code: 200,
        message: 'successful',
        data: newItem,
        oldPrice: item.price,
      };
    } catch (e) {
      return {
        code: 500,
        message: `updateItemById has error ${e}`,
        data: null,
      };
    }
  }
}

export default ItemService;

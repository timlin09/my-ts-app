/* eslint-disable class-methods-use-this */
import { BaseDal } from '../../db/dal/item';
import DalService from './dal.service';
import ItemSampleService from './item.base.service';
import getRandomInt from '../../utils/getRandom';
import { ItemInput, ItemOutput } from '../../db/model/item.model';

export interface ItemServiceOutput {
  code: number;
  message: string;
  data?: ItemOutput | ItemInput | null;
  datas?: ItemOutput[] | null;
  [propName: string]: any;
}

class ItemService<T extends BaseDal> extends ItemSampleService {
  public dalService: ItemSampleService;

  constructor(dal:T) {
    super();
    this.dalService = new DalService(dal);
  }

  getItemAll = async ():Promise<ItemServiceOutput> => {
    try {
      const datas:ItemOutput[] = await this.dalService.getAll();
      return { code: 200, message: 'successful', datas };
    } catch (e) {
      return { code: 500, message: `getItemAll has error ${e}`, datas: null };
    }
  };

  createItem = async (itemData:ItemInput): Promise<ItemServiceOutput> => {
    if (!itemData.name || !itemData.price) {
      return { code: 404, message: 'invalid name/price value!', data: null };
    }
    try {
      const item = await this.dalService.create(itemData);
      return { code: 200, message: 'successful', data: item };
    } catch (e) {
      return { code: 500, message: `createItem has error ${e}`, data: null };
    }
  };

  getItemById = async (id:number):Promise<ItemServiceOutput> => {
    try {
      const itemId = Number(id) || 0;
      if (!itemId) {
        return { code: 404, message: 'getItemById has error invaild itemId!', data: null };
      }
      const data = await this.dalService.getOne(itemId);

      return { code: 200, message: 'successful', data };
    } catch (e) {
      return { code: 500, message: `getItemById has error ${e}`, data: null };
    }
  };

  deleteItemById = async (
    id: number,
    customRandor:number = 0,
  ):Promise<ItemServiceOutput> => {
    const itemId = Number(id) || 0;
    if (!itemId) {
      return {
        code: 404,
        message: ' deleteItemById has invaild itemId!',
        data: null,
      };
    }

    try {
      const item = await this.dalService.getOne(itemId);
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
        await this.dalService.delete(itemId);

        return {
          code: 200,
          message: 'delete',
          data: null,
          oldPrice: item.price,
        };
      }

      const updateData = { ...item, price: item.price - rntNumber };
      const updatedItem:ItemOutput|null = await this.dalService.update(itemId, updateData);
      return {
        code: 200,
        message: 'delete',
        data: updatedItem,
        oldPrice: item.price,
      };
    } catch (e) {
      return {
        code: 500,
        message: `deleteItemById has error ${e}`,
        data: null,
      };
    }
  };

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

      const item = await this.dalService.getOne(itemId);

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

      const updateItem: ItemOutput|null = await this.dalService.update(itemId, newItem);
      return {
        code: 200,
        message: 'successful',
        data: updateItem,
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

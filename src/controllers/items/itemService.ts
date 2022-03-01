import { getAll, getById } from '../../db/dal/item';
import getRandomInt from '../../utils/getRandom';
import { ItemInput, ItemOuput } from '../../db/model/item.model';

export interface ItemServiceOutput {
  code: number;
  message: string;
  data?: ItemOuput | ItemInput | null;
  datas?: ItemOuput[] | null;
  [propName: string]: any
}

class ItemService {
  static async getItemAll():Promise<ItemServiceOutput> {
    try {
      const datas:ItemOuput[] = await getAll();
      return { code: 200, message: 'successful', datas };
    } catch (e) {
      return { code: 500, message: `getItemAll has error ${e}`, datas: null };
    }
  }

  static createItem(itemData:ItemInput):ItemServiceOutput {
    if (!itemData.name || !itemData.price) {
      return { code: 404, message: 'invalid name/price value!', data: null };
    }

    return { code: 200, message: 'successful', data: itemData };
  }

  static async getItemById(id:number):Promise<ItemServiceOutput> {
    try {
      const itemId = Number(id) || 0;
      if (!itemId) {
        return { code: 404, message: 'getItemById has error invaild itemId!', data: null };
      }
      const data:ItemOuput = await getById(itemId);

      return { code: 200, message: 'successful', data };
    } catch (e) {
      return { code: 500, message: `getItemById has error ${e}`, data: null };
    }
  }

  static async deleteItemById(
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
      const item = await getById(itemId);
      let rntNumber:number;
      if (!customRandor) {
        rntNumber = getRandomInt(100);
      } else {
        rntNumber = customRandor;
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

  static async updateItemById(id:number, itemData:ItemInput):Promise<ItemServiceOutput> {
    try {
      const itemId = Number(id) || 0;
      const price = Number(itemData.price) || 0;

      if (!itemId) {
        return { code: 404, message: ' updateItemById has invaild itemId!', data: null };
      }
      if (Object.keys(itemData).length === 0) {
        return { code: 404, message: 'no update data!!', data: null };
      }

      const item = await getById(itemId);
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

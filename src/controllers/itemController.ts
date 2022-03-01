import { Request, Response } from 'express';
import {
  getById, getAll, createItem, update, deleteById,
} from '../db/dal/item';
import getRandomInt from '../utils/getRandom';
import { ItemInput } from '../db/model/item.model';

class itemController {
  static async getOne(req:Request, res:Response): Promise<Response> {
    const itemId = Number(req.params.id) || 0;
    if (!itemId) {
      return res.status(501).json({ message: 'invaild itemId!', data: null });
    }

    try {
      const item = await getById(itemId);
      return res.status(200).json({ message: 'successful', data: item });
    } catch (error) {
      return res.status(500).json({ message: `getItem by id ${itemId} has ${error}` });
    }
  }

  static async getAll(req:Request, res:Response): Promise<Response> {
    try {
      const items = await getAll();
      return res.status(200).json({ message: 'successful', data: items });
    } catch (error) {
      return res.status(500).json({ message: `getAllItem has ${error}` });
    }
  }

  static async createOne(req:Request, res:Response): Promise<Response> {
    const newItem: ItemInput = req.body || {};
    if (!newItem.name || !newItem.price) {
      return res.status(501).json({ message: 'invalid name/price value!', data: null });
    }

    try {
      await createItem(newItem);
      return res.status(200).json({ message: 'create item successful', data: null });
    } catch (error) {
      return res.status(500).json({ message: `createItem has ${error}` });
    }
  }

  static async updateOne(req:Request, res:Response): Promise<Response> {
    const itemId = Number(req.params.id) || 0;
    const itemData: ItemInput = req.body;
    if (!itemId) {
      return res.status(501).json({ message: 'invaild itemId!', data: null });
    }

    try {
      const item = await getById(itemId);
      if (!item || !item.id) {
        return res.status(404).json({ message: `can not find item by ${itemId}`, data: null });
      }

      if (Object.keys(itemData).length === 0) {
        return res.status(404).json({ message: 'no update data!!', daga: null });
      }

      const totalPrice = item.price + itemData.price;
      const newPrice = totalPrice > 0 ? totalPrice : 0;

      const newItem: ItemInput = {
        ...item,
        ...itemData,
        price: newPrice,
        updatedAt: new Date(),
      };

      const result = await update(itemId, newItem);

      return res.status(200).json({ message: 'update itme is done!', data: result });
    } catch (error) {
      return res.status(500).json({ message: `updateItem by id ${itemId} has ${error}` });
    }
  }

  static async deleteOne(req:Request, res:Response): Promise<Response> {
    const itemId = Number(req.params.id) || 0;
    if (!itemId) {
      return res.status(501).json({ message: 'invaild itemId!', data: null });
    }

    try {
      const item = await getById(itemId);
      if (!item || !item.id) {
        return res.status(200).json({ message: `can not find item by ${itemId}`, data: null });
      }

      const rntNumber:number = getRandomInt(100);

      if (item.price - rntNumber < 0) {
        await deleteById(itemId);
        return res.status(200).json({ message: `delete item by id ${itemId} is done!`, data: null });
      }

      const result = await update(
        itemId,
        {
          ...item,
          price: item.price - rntNumber,
        },
      );
      return res.status(200).json({ message: `delete item by id ${itemId} is done!`, data: result });
    } catch (error) {
      return res.status(500).json({ message: `deleteItem by id ${itemId} has ${error}` });
    }
  }
}

export default itemController;

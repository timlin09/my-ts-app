import { Request, Response } from 'express';
import { createItem, update, deleteById } from '../../db/dal/item';
import ItemService, { ItemServiceOutput } from './itemService';
import { ItemInput } from '../../db/model/item.model';

class itemController {
  static async getOne(req:Request, res:Response): Promise<Response> {
    const itemId = Number(req.params.id);
    const item = await ItemService.getItemById(itemId);
    return res.status(item.code).json({ message: item.message, data: item.data });
  }

  static async getAll(req:Request, res:Response): Promise<Response> {
    const items:ItemServiceOutput = await ItemService.getItemAll();
    return res.status(items.code).json({ message: items.message, data: items.datas });
  }

  static async createOne(req:Request, res:Response): Promise<Response> {
    const newItem: ItemInput = req.body || {};
    const resData = ItemService.createItem(newItem);

    if (!resData.data) {
      return res.status(resData.code).json({ message: resData.message, data: null });
    }

    try {
      await createItem(resData.data);
      return res.status(200).json({ message: 'create item successful', data: null });
    } catch (error) {
      return res.status(500).json({ message: `createItem has ${error}` });
    }
  }

  static async updateOne(req:Request, res:Response): Promise<Response> {
    const itemId = Number(req.params.id) || 0;
    const itemData: ItemInput = req.body;

    const dataObj = await ItemService.updateItemById(itemId, itemData);

    if (dataObj.data) {
      try {
        const result = await update(itemId, dataObj.data);
        return res.status(200).json({ message: 'update itme is done!', data: result });
      } catch (e) {
        return res.status(500).json({ message: `updateItem by id ${itemId} has ${e}` });
      }
    }

    return res.status(dataObj.code).json({ message: dataObj.message, data: dataObj.data });
  }

  static async deleteOne(req:Request, res:Response): Promise<Response> {
    const itemId = Number(req.params.id) || 0;
    const resData = await ItemService.deleteItemById(itemId);
    if (resData.code !== 200) {
      return res.status(resData.code).json({ message: resData.message, data: null });
    }

    try {
      if (resData.code === 200 && resData.data) {
        const result = await update(
          itemId,
          resData.data,
        );
        return res.status(200).json({ message: `delete item by id ${itemId} is done!`, data: result });
      }
      await deleteById(itemId);
      return res.status(200).json({ message: `delete item by id ${itemId} is done!`, data: null });
    } catch (error) {
      return res.status(500).json({ message: `deleteItem by id ${itemId} has ${error}` });
    }
  }
}

export default itemController;

/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express';
import { BaseDal } from '../../db/dal/item';
import ItemService from './item.service';

import { ItemInput } from '../../db/model/item.model';

class itemController<T extends BaseDal> extends ItemService<T> {
  constructor(dal:T) {
    super(dal);
  }

  getOneItem = async (req:Request, res:Response): Promise<Response> => {
    const itemId = Number(req.params.id);
    const item = await this.getItemById(itemId);
    return res.status(item.code).json({ message: item.message, data: item.data });
  };

  getAllItems = async (req:Request, res:Response): Promise<Response> => {
    const items = await this.getItemAll();
    return res.status(items.code).json({ message: items.message, data: items.datas });
  };

  createOne = async (req:Request, res:Response): Promise<Response> => {
    const newItem: ItemInput = req.body || {};
    const item = await this.createItem(newItem);

    return res.status(item.code).json({ message: item.message, data: item.data });
  };

  updateOne = async (req:Request, res:Response): Promise<Response> => {
    const itemId = Number(req.params.id) || 0;
    const itemData: ItemInput = req.body;
    const updateItem = await this.updateItemById(itemId, itemData);
    return res.status(updateItem.code).json({ message: updateItem.message, data: updateItem.data });
  };

  deleteOne = async (req:Request, res:Response): Promise<Response> => {
    const itemId = Number(req.params.id) || 0;
    const item = await this.deleteItemById(itemId);
    return res.status(item.code).json({ message: item.message, data: item.data });
  };
}

export default itemController;

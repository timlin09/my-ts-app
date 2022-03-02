/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express';
import { BaseDal } from '../../db/dal/item';
import DalService from './dal.service';
// import ItemService, { ItemServiceOutput } from './item.service';

import { ItemInput } from '../../db/model/item.model';

class itemController<T extends BaseDal> {
  public dals: DalService<T>;

  public z:number;

  constructor(dal: T) {
    this.dals = new DalService<T>(dal);
    this.z = 123;
  }

  async getOneItem(req:Request, res:Response): Promise<Response> {
    const itemId = Number(req.params.id);
    // const rer = await this.dals.getOne(1);
    console.log(`itemId: ${itemId}`);
    const item = await this.dals.getOne(itemId);
    return res.status(200).json({ message: 'item.message', data: item });
  }

  async getAllItems(req:Request, res:Response): Promise<Response> {
    const items = await this.dals.getAll();
    return res.status(200).json({ message: 'items.message', data: items });
  }

  async createOne(req:Request, res:Response): Promise<Response> {
    const newItem: ItemInput = req.body || {};
    const resData = this.dals.create(newItem);

    if (!resData) {
      return res.status(404).json({ message: 'resData.message', data: null });
    }

    try {
      return res.status(200).json({ message: 'create item successful', data: resData });
    } catch (error) {
      return res.status(500).json({ message: `createItem has ${error}` });
    }
  }

  async updateOne(req:Request, res:Response): Promise<Response> {
    const itemId = Number(req.params.id) || 0;
    const itemData: ItemInput = req.body;

    // const dataObj = await this.dals.update(itemId, itemData);

    try {
      const result = await this.dals.update(itemId, itemData);
      return res.status(200).json({ message: 'update itme is done!', data: result });
    } catch (e) {
      return res.status(500).json({ message: `updateItem by id ${itemId} has ${e}` });
    }
  }

  async deleteOne(req:Request, res:Response): Promise<Response> {
    const itemId = Number(req.params.id) || 0;

    try {
      const resData = await this.dals.delete(itemId);
      return res.status(200).json({ message: `delete item by id ${itemId} is done!`, data: resData });
    } catch (error) {
      return res.status(500).json({ message: `deleteItem by id ${itemId} has ${error}` });
    }
  }
}

export default itemController;

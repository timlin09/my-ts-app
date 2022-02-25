import { Request, Response } from 'express';
import { getById } from '../db/dal/item';
import { ItemInput, ItemOuput } from '../db/model/item.model';

interface responseData {
  message: string;
  data: ItemOuput | null
}
class itemController {
  static async getOne(req:Request, res:Response): Promise<Response> {
    const itemId = Number(req.params.id) || 0;
    let resData: responseData = {
      message: 'Fail',
      data: null,
    };

    if (itemId) {
      const item = await getById(itemId)
        .catch((error) => { throw new Error(JSON.stringify({ code: 'getItemById has error', message: error })); });

      resData = {
        message: 'successful',
        data: item,
      };

      return res.status(200).json(resData);
    }
    return res.status(200).json(resData);
  }

  static getAll() {}

  static createOne() {}

  static updateOne() {}

  static deleteOne() {}
}

export default itemController;

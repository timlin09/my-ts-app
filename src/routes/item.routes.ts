import { Request, Response } from 'express';
import MainRoute from './route.abstract';
import ItemDal from '../db/dal/item';
import ItemService from '../controllers/items/item.service';
import { ItemInput } from '../db/model/item.model';

class ItemRoutes extends MainRoute {
  private itemService: ItemService<ItemDal>;

  constructor() {
    super();
    this.itemService = new ItemService(new ItemDal());
    this.setRoutes();
  }

  protected setRoutes = () => {
    this.router.get('/test', (req: Request, res: Response) => {
      res.status(200).send('you called item path test!');
    });
    this.router.route('/items')
    /**
   * get all items
   *
   * @group Items
   * @route GET /items
   * @returns {{}} 200 - success, return inserted data & related info
   * @returns {Error} 500 - unexpected error
   */
      .get(async (req:Request, res:Response) => {
        const items = await this.itemService.getItemAll();
        return res.status(items.code).json({ message: items.message, data: items.datas });
      })
    /**
   * create item
   *
   * @group Items
   * @route POST /items
   * @param {object} request.body - ex. {"name": "john", "price": 100}
   * @returns {{}} 200 - success, return inserted data & related info
   * @returns {Error} 404 - invaild name/price value error
   * @returns {Error} 500 - unexpected error
   */
      .post(async (req:Request, res:Response) => {
        const newItem: ItemInput = req.body || {};
        const item = await this.itemService.createItem(newItem);
        return res.status(item.code).json({ message: item.message, data: item.data });
      });

    this.router.route('/items/:id')

      /**
        * get items by id
        *
        * @group Items
        * @route GET /items/{id}
        * @param {integer} id.path.required - ex. 1 (required)
        * @returns {{}} 200 - success, return inserted data & related info
        * @returns {Error} 404 - invaild itemId error
        * @returns {Error} 500 - unexpected error
      */
      .get(async (req:Request, res:Response) => {
        const itemId = Number(req.params.id);
        const item = await this.itemService.getItemById(itemId);
        return res.status(item.code).json({ message: item.message, data: item.data });
      })

      /**
        * update items by id
        *
        * @group Items
        * @route PUT /items/{id}
        * @param {integer} id.path.required - ex. 1 (required)
        * @param {object} request.body - ex. {"name": "xxx", "priec": 100}
        * @returns {{}} 200 - success, return inserted data & related info
        * @returns {Error} 404 - can not find id or update data
        * @returns {Error} 404 - invaild itemId error
        * @returns {Error} 500 - unexpected error
      */
      .put(async (req:Request, res:Response) => {
        const itemId = Number(req.params.id) || 0;
        const itemData: ItemInput = req.body;
        const updateItem = await this.itemService.updateItemById(itemId, itemData);
        return res
          .status(updateItem.code)
          .json({ message: updateItem.message, data: updateItem.data });
      })
      /**
        * delete items by id
        *
        * @group Items
        * @route DELETE /items/{id}
        * @param {integer} id.path.required - ex. 1 (required)
        * @returns {{}} 200 - success, return inserted data & related info
        * @returns {Error} 404 - invaild itemId error
        * @returns {Error} 500 - unexpected error
      */
      .delete(async (req:Request, res:Response) => {
        const itemId = Number(req.params.id) || 0;
        const item = await this.itemService.deleteItemById(itemId);
        return res.status(item.code).json({ message: item.message, data: item.data });
      });
  };
}

export default ItemRoutes;

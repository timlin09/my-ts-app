import { Request, Response } from 'express';
import MainRoute from './route.abstract';
import ItemDal from '../db/dal/item';
import ItemController from '../controllers/items/item.controller';

const a = new ItemDal();
console.log(a.getAll);
class ItemRoutes extends MainRoute {
  private itemController: ItemController<ItemDal>;

  constructor() {
    super();
    this.itemController = new ItemController(a);
    this.setRoutes();
  }

  protected setRoutes() {
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
      .get(this.itemController.getAllItems)
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
      .post(this.itemController.createOne);

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
      .get(this.itemController.getOneItem)

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
      .put(this.itemController.updateOne)
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
      .delete(this.itemController.deleteOne);
  }
}

export default ItemRoutes;

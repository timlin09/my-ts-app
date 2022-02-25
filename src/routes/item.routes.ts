import { Request, Response } from 'express';
import MainRoute from './route.abstract';
import ItemController from '../controllers/itemController';

class ItemRoutes extends MainRoute {
  private itemController: ItemController = new ItemController();

  constructor() {
    super();
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('/test', (req: Request, res: Response) => {
      res.status(200).send('you called item path test!');
    });
    this.router.route('/item')
      .get(ItemController.getAll)
      .post(ItemController.createOne);

    this.router.route('/item/:id')
      .get(ItemController.getOne)
      .put(ItemController.updateOne)
      .delete(ItemController.deleteOne);
  }
}

export default ItemRoutes;

import MainRoute from './route.abstract';
import ItemRoutes from './item.routes';

const router: Array<MainRoute> = [
  new ItemRoutes(),
];

export default router;

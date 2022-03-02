import BaseService from './base.service';
import { ItemInput, ItemOutput } from '../../db/model/item.model';

class ItemSampleService extends BaseService<number, ItemInput, ItemOutput> {}

export default ItemSampleService;

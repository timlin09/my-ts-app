import { BaseDal } from '../../db/dal/item';
import ItemSampleService from './item.base.service';
import { ItemInput, ItemOutput } from '../../db/model/item.model';

export interface DalInterface {
  getOne(_id:number): Promise<ItemOutput|null>;
  getAll(): Promise<ItemOutput[]|[]>;
  create(_data:ItemInput): Promise<ItemOutput|null>;
  update(_id:number, _data:Partial<ItemInput>):Promise<ItemOutput|null>
  delete(_id:number):Promise<Boolean>
}
class DalService<T extends BaseDal>
  extends ItemSampleService
  implements DalInterface {
  public dal:T;

  constructor(Dal: T) {
    super();
    this.dal = Dal;
  }

  getOne = async (id: number) => {
    const resData = await this.dal.getById(id);
    return resData;
  };

  getAll = async () => {
    const resData = await this.dal.getAll();
    return resData;
  };

  create = async (itemData: ItemInput) => {
    const resData = await this.dal.createItem(itemData);
    return resData;
  };

  update = async (id:number, itemData:Partial<ItemInput>) => {
    const resData = await this.dal.update(id, itemData);
    return resData;
  };

  delete = async (id: number) => {
    const isDelete = await this.dal.deleteById(id);
    return isDelete;
  };
}

export default DalService;

/* eslint-disable class-methods-use-this */

export interface BaseMethods<T1, T2, T3> {
  getAll():Promise<T3[]|[]>;
  getOne(_param:T1):Promise<T3|null>;
  create(_param:T2):Promise<T3|null>;
  update(_param1:T1, _param2:Partial<T2>):Promise<T3|null>;
  delete(_param1:T1):Promise<Boolean>
}

class BaseService<T1, T2, T3> implements BaseMethods<T1, T2, T3> {
  async getAll(): Promise<T3[]|[]> {
    return [];
  }

  async getOne(_param: T1): Promise<T3|null> {
    return null;
  }

  async create(_param: T2): Promise<T3 | null> {
    return null;
  }

  async update(_param1: T1, _param2: Partial<T2>): Promise<T3 | null> {
    return null;
  }

  async delete(_param1: T1): Promise<Boolean> {
    return false;
  }
}

export default BaseService;

import { Op } from 'sequelize';
import { GetItemsFilters } from './types';
import ItemModel, { ItemInput, ItemOuput } from '../model/item.model';

export const createItem = async (payload: ItemInput): Promise<ItemOuput> => {
  const newItem = await ItemModel.create(payload);
  return newItem;
};

export const update = async (id: number, payload: Partial<ItemInput>): Promise<ItemOuput> => {
  const item = await ItemModel.findByPk(id);
  if (!item) {
    // @todo throw custom error
    throw new Error('not found');
  }
  const updatedItem = await (item as ItemModel).update(payload);
  return updatedItem;
};

export const getById = async (id: number): Promise<ItemOuput> => {
  const item = await ItemModel.findByPk(id);
  if (!item) {
    // @todo throw custom error
    throw new Error('not found');
  }
  return item;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedItemModelCount = await ItemModel.destroy({
    where: { id },
  });
  return !!deletedItemModelCount;
};

export const getAll = async (filters?: GetItemsFilters): Promise<ItemOuput[]> => ItemModel.findAll({
  where: {
    ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
  },
  ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
});

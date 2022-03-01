import { Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from '../config';

export interface ItemAttributes {
  id: number;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: Date;
}

export interface ItemInput extends Optional<ItemAttributes, 'id'> {}
export interface ItemOuput extends Required<ItemAttributes> {}

class ItemModel extends Model<ItemAttributes, ItemInput> implements ItemAttributes {
  public id!: number;

  public name!: string;

  public price!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deleteAt!: Date;
}

ItemModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true,
});

export default ItemModel;

import ItemModel from './model/item.model';

const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
  ItemModel.sync({ alter: isDev });
};

export default dbInit;

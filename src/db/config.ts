import { Sequelize, Model } from 'sequelize';
import { SequelizeHooks } from 'sequelize/types/hooks.d';

require('dotenv').config();

const dbPath = process.env.DB_PATH as string;

const hooks: Partial<SequelizeHooks<Model<any, any>, any, any>> = {
  afterUpdate: (instance: Model<any, any>) => {
    const cacheKey = `${instance.constructor.name.toLowerCase()}s`;

    const currentData = instance.get({ plain: true });

    console.log(`cacheKey: ${cacheKey}, currentData: ${JSON.stringify(currentData)}`);
  },
  afterCreate: (instance: Model<any, any>) => {
    const cacheKey = `${instance.constructor.name.toLowerCase()}s`;
    const currentData = instance.get({ plain: true });
    console.log(`cacheKey: ${cacheKey}, currentData: ${JSON.stringify(currentData)}`);
  },
};

const simpolDbOptions:object = {
  logging: false,
  pool: {
    idle: 5000,
    max: 10,
    acquire: 300000,
  },
  define: { hooks },
};

const sequelizeConnection = new Sequelize(dbPath, simpolDbOptions);

export default sequelizeConnection;

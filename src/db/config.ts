import { Sequelize } from 'sequelize';

const dbPath:string = 'postgres://ndykhudw:W3qrZbJEws_4EacXeDCEhY_oKSITuJBE@castor.db.elephantsql.com/ndykhudw';
const simpolDbOptions:object = {
  logging: false,
  pool: {
    idle: 5000,
    max: 10,
    acquire: 300000,
  },
};

const sequelizeConnection = new Sequelize(dbPath, simpolDbOptions);

export default sequelizeConnection;

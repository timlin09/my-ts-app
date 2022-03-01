import express from 'express';
import dbInit from './db/init';
import router from './routes/router';
import config from './config';

const swagger = require('express-swagger-generator');

class App {
  public app: express.Application;

  private dbInit: Function = dbInit;

  constructor() {
    this.app = express();
  }

  async init() {
    this.config();
    this.routerSetup();
    await this.dbConnect();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    swagger(this.app)(config);
  }

  private routerSetup(): void {
    router.forEach((route) => {
      this.app.use(route.getPrefix(), route.getRouter());
    });
  }

  private async dbConnect(): Promise<void> {
    await this.dbInit();
  }
}

const service = new App();

service.init();

export default service.app;
